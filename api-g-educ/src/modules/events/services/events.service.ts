
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  ContentStatus,
  ReminderStatus,
  Role,
  NotificationType,
} from '../../../generated/prisma/client';

import { Prisma } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

import { AuditService } from '../../audit/services/audit.service';
import { AUDIT_ACTIONS } from '../../audit/constants/audit-actions.constants';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';
import { NotificationsService } from '../../notifications/services/notifications.service';

import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import type { CreateEventDto } from '../dto/create-event.dto';
import type { UpdateEventDto } from '../dto/update-event.dto';
import type { EventFilterDto } from '../dto/event-filter.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly teacherScope: TeacherScopeService,
    private readonly notificationsService: NotificationsService,
  ) {}

  private buildReminderDates(startsAt: Date): Date[] {
    const eventDay = new Date(
      Date.UTC(
        startsAt.getUTCFullYear(),
        startsAt.getUTCMonth(),
        startsAt.getUTCDate(),
      ),
    );

    const now = new Date();
    const dates: Date[] = [];

    for (const daysBefore of [7, 1, 0]) {
      const reminderDate = new Date(eventDay);

      reminderDate.setUTCDate(
        reminderDate.getUTCDate() - daysBefore,
      );

      // Heure du rappel : 07 h 00, heure du Burkina Faso (UTC+0).
      reminderDate.setUTCHours(7, 0, 0, 0);

      if (reminderDate > now) {
        dates.push(reminderDate);
      }
    }

    return dates;
  }

  private async assertCanManageEvent(
    user: AuthenticatedUser,
    classId: string,
    subjectId?: string | null,
  ) {
    if (!subjectId) {
      await this.teacherScope.assertCanManageClass(user, classId);
      return;
    }

    const classSubject = await this.prisma.classSubject.findFirst({
      where: {
        classId,
        subjectId,
      },
      select: {
        id: true,
      },
    });

    if (!classSubject) {
      throw new NotFoundException(
        'Cette matière n’est pas enseignée dans cette classe',
      );
    }

    await this.teacherScope.assertCanManage(
      user,
      classSubject.id,
    );
  }

  private validateDates(startsAt: Date, endsAt?: Date | null) {
    if (Number.isNaN(startsAt.getTime())) {
      throw new BadRequestException('Date de début invalide');
    }

    if (endsAt && Number.isNaN(endsAt.getTime())) {
      throw new BadRequestException('Date de fin invalide');
    }

    if (endsAt && endsAt <= startsAt) {
      throw new BadRequestException(
        'La date de fin doit être postérieure à la date de début',
      );
    }
  }

  async create(
    user: AuthenticatedUser,
    dto: CreateEventDto,
  ) {
    const title = dto.title.trim();

    if (!title) {
      throw new BadRequestException('Le titre est obligatoire');
    }

    const startsAt = new Date(dto.startsAt);
    const endsAt = dto.endsAt ? new Date(dto.endsAt) : null;

    this.validateDates(startsAt, endsAt);

    await this.assertCanManageEvent(
      user,
      dto.classId,
      dto.subjectId,
    );

    const event = await this.prisma.$transaction(async (tx) => {
      const created = await tx.event.create({
        data: {
          classId: dto.classId,
          type: dto.type,
          title,
          description: dto.description?.trim() || null,
          subjectId: dto.subjectId ?? null,
          startsAt,
          endsAt,
          createdById: user.id,
        },
      });

      const reminderDates = this.buildReminderDates(startsAt);

      if (reminderDates.length > 0) {
        await tx.eventReminder.createMany({
          data: reminderDates.map((remindAt) => ({
            eventId: created.id,
            remindAt,
          })),
        });
      }

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.EVENT_CREATED,
          entityType: 'Event',
          entityId: created.id,
          after: {
            title: created.title,
            type: created.type,
            classId: created.classId,
            subjectId: created.subjectId,
            startsAt: created.startsAt,
            endsAt: created.endsAt,
            status: created.status,
            reminderCount: reminderDates.length,
          },
        },
        tx,
      );

      return created;
    });

    // L'annonce est envoyée après la validation de la transaction.
    try {
      await this.notificationsService.notifyClass(dto.classId, {
        type: NotificationType.EVENEMENT_ANNONCE,
        title: 'Nouvel événement',
        body: `${event.title} — ${event.startsAt.toLocaleString('fr-FR', {
          timeZone: 'Africa/Ouagadougou',
        })}`,
        data: {
          eventId: event.id,
          type: event.type,
        },
      });
    } catch (error) {
      this.logger.error(
        `Impossible d'envoyer l'annonce de l'événement ${event.id}`,
        error instanceof Error ? error.stack : String(error),
      );
    }

    return event;
  }

  async update(
    user: AuthenticatedUser,
    eventId: string,
    dto: UpdateEventDto,
  ) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Événement introuvable');
    }

    if (event.status === ContentStatus.ARCHIVE) {
      throw new BadRequestException(
        'Un événement archivé ne peut pas être modifié',
      );
    }

    await this.assertCanManageEvent(
      user,
      event.classId,
      dto.subjectId === undefined ? event.subjectId : dto.subjectId,
    );

    const hasChanges = Object.values(dto).some(
      (value) => value !== undefined,
    );

    if (!hasChanges) {
      throw new BadRequestException('Aucune modification fournie');
    }

    const startsAt =
      dto.startsAt !== undefined
        ? new Date(dto.startsAt)
        : event.startsAt;

    const endsAt =
      dto.endsAt !== undefined
        ? dto.endsAt
          ? new Date(dto.endsAt)
          : null
        : event.endsAt;

    this.validateDates(startsAt, endsAt);

    if (dto.title !== undefined && !dto.title.trim()) {
      throw new BadRequestException('Le titre est obligatoire');
    }

    const startsAtChanged =
      dto.startsAt !== undefined &&
      startsAt.getTime() !== event.startsAt.getTime();

    return this.prisma.$transaction(async (tx) => {
      if (startsAtChanged) {
        await tx.eventReminder.updateMany({
          where: {
            eventId,
            status: ReminderStatus.PLANIFIE,
          },
          data: {
            status: ReminderStatus.ANNULE,
          },
        });
      }

      const updated = await tx.event.update({
        where: { id: eventId },
        data: {
          ...(dto.type !== undefined && { type: dto.type }),
          ...(dto.title !== undefined && {
            title: dto.title.trim(),
          }),
          ...(dto.description !== undefined && {
            description: dto.description?.trim() || null,
          }),
          ...(dto.subjectId !== undefined && {
            subjectId: dto.subjectId,
          }),
          ...(dto.startsAt !== undefined && { startsAt }),
          ...(dto.endsAt !== undefined && { endsAt }),
        },
      });

      let newReminderCount = 0;

      if (startsAtChanged) {
        const reminderDates = this.buildReminderDates(startsAt);
        newReminderCount = reminderDates.length;

        if (reminderDates.length > 0) {
          await tx.eventReminder.createMany({
            data: reminderDates.map((remindAt) => ({
              eventId,
              remindAt,
            })),
          });
        }
      }

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.EVENT_UPDATED,
          entityType: 'Event',
          entityId: eventId,
          before: {
            title: event.title,
            type: event.type,
            subjectId: event.subjectId,
            startsAt: event.startsAt,
            endsAt: event.endsAt,
          },
          after: {
            title: updated.title,
            type: updated.type,
            subjectId: updated.subjectId,
            startsAt: updated.startsAt,
            endsAt: updated.endsAt,
            remindersReplanned: startsAtChanged,
            newReminderCount,
          },
        },
        tx,
      );

      return updated;
    });
  }

  async archive(
    user: AuthenticatedUser,
    eventId: string,
  ) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Événement introuvable');
    }

    if (event.status === ContentStatus.ARCHIVE) {
      throw new BadRequestException(
        'Cet événement est déjà archivé',
      );
    }

    await this.assertCanManageEvent(
      user,
      event.classId,
      event.subjectId,
    );

    return this.prisma.$transaction(async (tx) => {
      const archived = await tx.event.update({
        where: { id: eventId },
        data: {
          status: ContentStatus.ARCHIVE,
        },
      });

      await tx.eventReminder.updateMany({
        where: {
          eventId,
          status: ReminderStatus.PLANIFIE,
        },
        data: {
          status: ReminderStatus.ANNULE,
        },
      });

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.EVENT_ARCHIVED,
          entityType: 'Event',
          entityId: eventId,
          before: {
            title: event.title,
            status: event.status,
          },
          after: {
            title: archived.title,
            status: archived.status,
          },
        },
        tx,
      );

      return archived;
    });
  }

  async findAll(
    user: AuthenticatedUser,
    filters: EventFilterDto,
  ) {
    const where: Prisma.EventWhereInput = {
      status: ContentStatus.PUBLIE,

      ...(filters.from || filters.to
        ? {
            startsAt: {
              ...(filters.from && {
                gte: new Date(filters.from),
              }),
              ...(filters.to && {
                lte: new Date(filters.to),
              }),
            },
          }
        : {}),

      ...(filters.type && { type: filters.type }),
      ...(filters.subjectId && {
        subjectId: filters.subjectId,
      }),
    };

    if (user.role === Role.ELEVE) {
      if (!user.classId) {
        throw new NotFoundException(
          'Aucune classe associée à votre compte',
        );
      }

      where.classId = user.classId;
    }

    return this.prisma.event.findMany({
      where,
      orderBy: {
        startsAt: 'asc',
      },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
        class: {
          select: {
            id: true,
            code: true,
            label: true,
          },
        },
      },
    });
  }
}
