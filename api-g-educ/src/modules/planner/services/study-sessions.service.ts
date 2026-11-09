
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  Prisma,
  Recurrence,
} from '../../../generated/prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

import { CreateStudySessionDto } from '../dto/create-study-session.dto';
import { UpdateStudySessionDto } from '../dto/update-study-session.dto';
import { FilterStudySessionsDto } from '../dto/filter-study-sessions.dto';

@Injectable()
export class StudySessionsService {
  constructor(private readonly prisma: PrismaService) {}

  private toDate(value: string): Date {
    return new Date(value);
  }

  private toDateOnly(value: Date): string {
    return value.toISOString().slice(0, 10);
  }

  private validatePeriod(
    startsAt: Date,
    endsAt: Date,
  ): void {
    if (endsAt.getTime() <= startsAt.getTime()) {
      throw new BadRequestException(
        'La date de fin doit être postérieure à la date de début.',
      );
    }
  }

  private validateRecurrence(
    recurrence: Recurrence,
    recurrenceEndsOn: Date | null,
    startsAt: Date,
  ): void {
    if (recurrence === Recurrence.AUCUNE) {
      return;
    }

    if (!recurrenceEndsOn) {
      throw new BadRequestException(
        'Une date de fin est obligatoire pour une séance récurrente.',
      );
    }

    if (
      this.toDateOnly(recurrenceEndsOn) <
      this.toDateOnly(startsAt)
    ) {
      throw new BadRequestException(
        'La date de fin de récurrence ne peut pas précéder la date de début.',
      );
    }
  }

  private async validateSubject(
    userId: string,
    subjectId: string | null | undefined,
  ): Promise<void> {
    if (!subjectId) {
      return;
    }

    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId },
      select: {
        classId: true,
      },
    });

    if (!profile) {
      throw new NotFoundException(
        'Profil élève introuvable.',
      );
    }

    const classSubject = await this.prisma.classSubject.findFirst({
      where: {
        classId: profile.classId,
        subjectId,
        subject: {
          isActive: true,
        },
      },
      select: {
        id: true,
      },
    });

    if (!classSubject) {
      throw new NotFoundException(
        'Matière introuvable pour cette classe.',
      );
    }
  }

  private isUniqueConstraintError(error: unknown): boolean {
    return (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    );
  }

  private async findByClientId(
    userId: string,
    clientId: string,
  ) {
    return this.prisma.studySession.findUnique({
      where: {
        userId_clientId: {
          userId,
          clientId,
        },
      },
    });
  }

  async create(
    userId: string,
    dto: CreateStudySessionDto,
  ) {
    const title = dto.title.trim();

    if (!title) {
      throw new BadRequestException(
        'Le titre de la séance est obligatoire.',
      );
    }

    // Vérifier l'idempotence avant toute création.
    const existing = await this.findByClientId(
      userId,
      dto.clientId,
    );

    if (existing) {
      return existing;
    }

    const startsAt = this.toDate(dto.startsAt);
    const endsAt = this.toDate(dto.endsAt);

    this.validatePeriod(startsAt, endsAt);

    const recurrence = dto.recurrence ?? Recurrence.AUCUNE;

    const recurrenceEndsOn = dto.recurrenceEndsOn
      ? this.toDate(`${dto.recurrenceEndsOn}T00:00:00.000Z`)
      : null;

    this.validateRecurrence(
      recurrence,
      recurrenceEndsOn,
      startsAt,
    );

    await this.validateSubject(userId, dto.subjectId);

    try {
      return await this.prisma.studySession.create({
        data: {
          userId,
          clientId: dto.clientId,
          title,
          subjectId: dto.subjectId ?? null,
          startsAt,
          endsAt,
          recurrence,
          recurrenceEndsOn,
          reminderMinutesBefore:
            dto.reminderMinutesBefore ?? 15,
        },
      });
    } catch (error) {
      // Deux requêtes simultanées peuvent tenter
      // de créer le même clientId.
      if (this.isUniqueConstraintError(error)) {
        const concurrentSession = await this.findByClientId(
          userId,
          dto.clientId,
        );

        if (concurrentSession) {
          return concurrentSession;
        }
      }

      throw error;
    }
  }

  async findAll(
    userId: string,
    filters: FilterStudySessionsDto,
  ) {
    const { from, to, updatedSince } = filters;

    if (from && to && new Date(from) > new Date(to)) {
      throw new BadRequestException(
        'La date de début du filtre doit précéder la date de fin.',
      );
    }

    const where: Prisma.StudySessionWhereInput = {
      userId,
    };

    if (updatedSince) {
      where.updatedAt = {
        gte: this.toDate(updatedSince),
      };
    } else {
      // Sans synchronisation, ne pas retourner
      // les séances supprimées.
      where.deletedAt = null;
    }

    if (from || to) {
      where.startsAt = {
        ...(from ? { gte: this.toDate(from) } : {}),
        ...(to ? { lte: this.toDate(to) } : {}),
      };
    }

    return this.prisma.studySession.findMany({
      where,
      orderBy: updatedSince
        ? { updatedAt: 'asc' }
        : { startsAt: 'asc' },
    });
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateStudySessionDto,
  ) {
    const existing = await this.prisma.studySession.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!existing) {
      throw new NotFoundException(
        'Séance de révision introuvable.',
      );
    }

    const startsAt = dto.startsAt
      ? this.toDate(dto.startsAt)
      : existing.startsAt;

    const endsAt = dto.endsAt
      ? this.toDate(dto.endsAt)
      : existing.endsAt;

    this.validatePeriod(startsAt, endsAt);

    const recurrence = dto.recurrence ?? existing.recurrence;

    const recurrenceEndsOn =
      dto.recurrenceEndsOn === null
        ? null
        : dto.recurrenceEndsOn !== undefined
          ? this.toDate(`${dto.recurrenceEndsOn}T00:00:00.000Z`)
          : existing.recurrenceEndsOn;

    this.validateRecurrence(
      recurrence,
      recurrenceEndsOn,
      startsAt,
    );

    const subjectId =
      dto.subjectId !== undefined
        ? dto.subjectId
        : existing.subjectId;

    await this.validateSubject(userId, subjectId);

    const title =
      dto.title !== undefined
        ? dto.title.trim()
        : existing.title;

    if (!title) {
      throw new BadRequestException(
        'Le titre de la séance est obligatoire.',
      );
    }

    try {
      return await this.prisma.studySession.update({
        where: {
          id,
          userId,
          deletedAt: null,
        },
        data: {
          title,
          subjectId,
          startsAt,
          endsAt,
          recurrence,
          recurrenceEndsOn,
          ...(dto.reminderMinutesBefore !== undefined
            ? {
                reminderMinutesBefore:
                  dto.reminderMinutesBefore,
              }
            : {}),
          ...(dto.completedAt !== undefined
            ? {
                completedAt:
                  dto.completedAt === null
                    ? null
                    : this.toDate(dto.completedAt),
              }
            : {}),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          'Séance de révision introuvable.',
        );
      }

      throw error;
    }
  }

  async remove(userId: string, id: string) {
    try {
      return await this.prisma.studySession.update({
        where: {
          id,
          userId,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          'Séance de révision introuvable.',
        );
      }

      throw error;
    }
  }
}
