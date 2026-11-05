
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import {
  ActivityRefType,
  ActivityType,
  AttemptStatus,
  ContentStatus,
  AssessmentKind,
  Prisma,
} from '../../../generated/prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { ActivityQueryDto } from '../dto/activity-query.dto';

const FUTURE_TOLERANCE_MS = 5 * 60 * 1000;
const MAX_ACTIVITY_AGE_MS = 48 * 60 * 60 * 1000;
const MAX_CALENDAR_DAYS = 366;

type RecordActivityInput = {
  userId: string;
  clientId: string;
  type: ActivityType;
  refType: ActivityRefType;
  refId: string;
  occurredAt: Date;
};

type AuthenticatedStudent = {
  id: string;
  classId: string | null;
};

@Injectable()
export class GamificationService {
  constructor(private readonly prisma: PrismaService) {}

  private toUtcDay(date: Date): Date {
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
      ),
    );
  }

  private dateKey(date: Date): string {
    return this.toUtcDay(date).toISOString().slice(0, 10);
  }

  private addDays(date: Date, days: number): Date {
    const result = this.toUtcDay(date);
    result.setUTCDate(result.getUTCDate() + days);
    return result;
  }

  private differenceInDays(first: Date, second: Date): number {
    return Math.round(
      (this.toUtcDay(second).getTime() -
        this.toUtcDay(first).getTime()) /
        86_400_000,
    );
  }

  private validateOccurredAt(occurredAt: Date): Date {
    if (Number.isNaN(occurredAt.getTime())) {
      throw new BadRequestException('Date d’activité invalide');
    }

    const now = Date.now();
    const timestamp = occurredAt.getTime();

    if (timestamp > now + FUTURE_TOLERANCE_MS) {
      throw new BadRequestException(
        'Une activité ne peut pas être enregistrée dans le futur',
      );
    }

    if (timestamp < now - MAX_ACTIVITY_AGE_MS) {
      throw new BadRequestException(
        'Une activité datant de plus de 48 heures ne peut pas être enregistrée',
      );
    }

    return this.toUtcDay(occurredAt);
  }

  private isStreakActivity(type: ActivityType): boolean {
    return (
      type !== ActivityType.CONTRIBUTION_PUBLIEE &&
      type !== ActivityType.FORUM_REPONSE
    );
  }

  /**
   * Vérifie que l'activité correspond réellement à une action
   * effectuée par l'élève connecté.
   */
  private async validateActivityReference(
    tx: Prisma.TransactionClient,
    user: AuthenticatedStudent,
    input: RecordActivityInput,
  ): Promise<void> {
    if (input.type === ActivityType.CONTRIBUTION_PUBLIEE) {
      throw new BadRequestException(
        'La publication d’une contribution est enregistrée par le serveur',
      );
    }

    if (
      input.type === ActivityType.LECON_TERMINEE &&
      input.refType === ActivityRefType.LESSON
    ) {
      if (!user.classId) {
        throw new BadRequestException('Classe de l’élève introuvable');
      }

      const progress = await tx.lessonProgress.findFirst({
        where: {
          userId: user.id,
          lessonId: input.refId,
          completedAt: { not: null },
          lesson: {
            classId: user.classId,
            status: ContentStatus.PUBLIE,
          },
        },
        select: { id: true },
      });

      if (!progress) {
        throw new NotFoundException(
          'Leçon terminée introuvable pour cet élève',
        );
      }

      return;
    }

    if (
      (input.type === ActivityType.EXERCICE_TERMINE ||
        input.type === ActivityType.QUIZ_TERMINE) &&
      input.refType === ActivityRefType.ASSESSMENT
    ) {
      if (!user.classId) {
        throw new BadRequestException('Classe de l’élève introuvable');
      }

      const expectedKind =
        input.type === ActivityType.EXERCICE_TERMINE
          ? AssessmentKind.EXERCICE
          : AssessmentKind.QUIZ;

      const attempt = await tx.attempt.findFirst({
        where: {
          userId: user.id,
          assessmentId: input.refId,
          status: AttemptStatus.TERMINEE,
          assessment: {
            classId: user.classId,
            status: ContentStatus.PUBLIE,
            kind: expectedKind,
          },
        },
        select: { id: true },
      });

      if (!attempt) {
        throw new NotFoundException(
          'Tentative terminée introuvable pour cet élève',
        );
      }

      return;
    }

    if (
      input.type === ActivityType.FORUM_REPONSE &&
      input.refType === ActivityRefType.FORUM_ANSWER
    ) {
      const answer = await tx.forumAnswer.findFirst({
        where: {
          id: input.refId,
          authorId: user.id,
        },
        select: { id: true },
      });

      if (!answer) {
        throw new NotFoundException(
          'Réponse du forum introuvable pour cet élève',
        );
      }

      return;
    }

    throw new BadRequestException(
      'Le type d’activité ne correspond pas au type de référence',
    );
  }

  /**
   * Enregistre une activité dans une transaction existante.
   * Cette méthode est également destinée aux autres modules.
   */
  async recordActivity(
    tx: Prisma.TransactionClient,
    input: RecordActivityInput,
  ) {
    const activityDate = this.validateOccurredAt(input.occurredAt);

    const inserted = await tx.activityLog.createMany({
      data: {
        userId: input.userId,
        clientId: input.clientId,
        type: input.type,
        refType: input.refType,
        refId: input.refId,
        occurredAt: input.occurredAt,
        activityDate,
      },
      skipDuplicates: true,
    });

    // Même clientId : activité déjà enregistrée.
    // Ne surtout pas toucher à la flamme.
    if (inserted.count === 0) {
      return {
        recorded: false,
        duplicate: true,
        streakUpdated: false,
      };
    }

    // Certaines activités sont conservées dans le journal,
    // mais ne comptent pas dans la flamme.
    if (!this.isStreakActivity(input.type)) {
      return {
        recorded: true,
        duplicate: false,
        streakUpdated: false,
      };
    }

    // Créer la ligne avant le verrouillage pour gérer
    // également le premier enregistrement d'un utilisateur.
    await tx.userStreak.upsert({
      where: { userId: input.userId },
      create: {
        userId: input.userId,
        currentStreak: 0,
        longestStreak: 0,
      },
      update: {},
    });

    // Verrouillage de la ligne : évite les mises à jour concurrentes.
    await tx.$queryRaw`
      SELECT "userId"
      FROM "user_streaks"
      WHERE "userId" = ${input.userId}::uuid
      FOR UPDATE
    `;

    const streak = await tx.userStreak.findUniqueOrThrow({
      where: { userId: input.userId },
    });

    // Une activité hors ligne plus ancienne ne doit pas
    // faire reculer la flamme déjà calculée.
    if (
      streak.lastActiveDate &&
      activityDate.getTime() < this.toUtcDay(streak.lastActiveDate).getTime()
    ) {
      return {
        recorded: true,
        duplicate: false,
        streakUpdated: false,
      };
    }

    let currentStreak = streak.currentStreak;

    if (!streak.lastActiveDate) {
      currentStreak = 1;
    } else {
      const difference = this.differenceInDays(
        streak.lastActiveDate,
        activityDate,
      );

      if (difference === 0) {
        // Plusieurs activités le même jour : aucun incrément.
        return {
          recorded: true,
          duplicate: false,
          streakUpdated: false,
        };
      }

      if (difference === 1) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
    }

    const longestStreak = Math.max(
      streak.longestStreak,
      currentStreak,
    );

    await tx.userStreak.update({
      where: { userId: input.userId },
      data: {
        currentStreak,
        longestStreak,
        lastActiveDate: activityDate,
      },
    });

    return {
      recorded: true,
      duplicate: false,
      streakUpdated: true,
      currentStreak,
      longestStreak,
    };
  }

  /**
   * Point d'entrée utilisé par le contrôleur.
   * Vérifie la référence puis enregistre dans la même transaction.
   */
  async recordActivityForUser(
    user: AuthenticatedStudent,
    input: RecordActivityInput,
  ) {
    return this.prisma.$transaction(async (tx) => {
      await this.validateActivityReference(tx, user, input);
      return this.recordActivity(tx, input);
    });
  }

  /**
   * Enregistrement d'une activité déclenchée côté serveur.
   * Exemple : contribution publiée.
   */
  async recordServerActivity(
    tx: Prisma.TransactionClient,
    input: Omit<RecordActivityInput, 'clientId'>,
  ) {
    return this.recordActivity(tx, {
      ...input,
      clientId: randomUUID(),
    });
  }

  async getStreak(userId: string) {
    const streak = await this.prisma.userStreak.findUnique({
      where: { userId },
    });

    if (!streak) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      };
    }

    const today = this.toUtcDay(new Date());
    const yesterday = this.addDays(today, -1);

    const isCurrent =
      streak.lastActiveDate !== null &&
      this.toUtcDay(streak.lastActiveDate).getTime() >=
        yesterday.getTime();

    return {
      currentStreak: isCurrent ? streak.currentStreak : 0,
      longestStreak: streak.longestStreak,
      lastActiveDate: streak.lastActiveDate,
    };
  }

  async getActivityCalendar(
    userId: string,
    query: ActivityQueryDto,
  ) {
    const today = this.toUtcDay(new Date());

    const to = query.to
      ? this.toUtcDay(new Date(`${query.to}T00:00:00.000Z`))
      : today;

    const from = query.from
      ? this.toUtcDay(new Date(`${query.from}T00:00:00.000Z`))
      : this.addDays(to, -29);

    if (
      Number.isNaN(from.getTime()) ||
      Number.isNaN(to.getTime())
    ) {
      throw new BadRequestException('Période invalide');
    }

    if (from.getTime() > to.getTime()) {
      throw new BadRequestException(
        'La date de début doit précéder la date de fin',
      );
    }

    const numberOfDays =
      this.differenceInDays(from, to) + 1;

    if (numberOfDays > MAX_CALENDAR_DAYS) {
      throw new BadRequestException(
        `La période ne peut pas dépasser ${MAX_CALENDAR_DAYS} jours`,
      );
    }

    const activities = await this.prisma.activityLog.findMany({
      where: {
        userId,
        activityDate: {
          gte: from,
          lt: this.addDays(to, 1),
        },
      },
      select: {
        activityDate: true,
      },
      distinct: ['activityDate'],
      orderBy: {
        activityDate: 'asc',
      },
    });

    const activeDays = activities.map((activity) =>
      this.dateKey(activity.activityDate),
    );

    return {
      from: this.dateKey(from),
      to: this.dateKey(to),
      activeDays,
      totalActiveDays: activeDays.length,
    };
  }

  /**
   * Reconstruit le cache UserStreak à partir du journal immuable.
   */
  async recomputeStreak(userId: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.userStreak.upsert({
        where: { userId },
        create: {
          userId,
          currentStreak: 0,
          longestStreak: 0,
        },
        update: {},
      });

      await tx.$queryRaw`
        SELECT "userId"
        FROM "user_streaks"
        WHERE "userId" = ${userId}::uuid
        FOR UPDATE
      `;

      const activities = await tx.activityLog.findMany({
        where: {
          userId,
          type: {
            notIn: [
              ActivityType.CONTRIBUTION_PUBLIEE,
              ActivityType.FORUM_REPONSE,
            ],
          },
        },
        select: {
          activityDate: true,
        },
        orderBy: {
          activityDate: 'asc',
        },
      });

      const dates = [
        ...new Set(
          activities.map((activity) =>
            this.dateKey(activity.activityDate),
          ),
        ),
      ].map((date) => new Date(`${date}T00:00:00.000Z`));

      let longestStreak = 0;
      let runningStreak = 0;

      for (let i = 0; i < dates.length; i++) {
        if (
          i > 0 &&
          this.differenceInDays(dates[i - 1], dates[i]) === 1
        ) {
          runningStreak += 1;
        } else {
          runningStreak = 1;
        }

        longestStreak = Math.max(longestStreak, runningStreak);
      }

      const currentStreak = runningStreak;
      const lastActiveDate =
  dates.length > 0 ? dates[dates.length - 1] : null;

      const updated = await tx.userStreak.update({
        where: { userId },
        data: {
          currentStreak,
          longestStreak,
          lastActiveDate,
        },
      });

      return {
        currentStreak: updated.currentStreak,
        longestStreak: updated.longestStreak,
        lastActiveDate: updated.lastActiveDate,
      };
    });
  }
}
