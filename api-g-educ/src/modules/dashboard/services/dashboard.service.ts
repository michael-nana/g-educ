import { Injectable } from '@nestjs/common';
import {
  AssessmentKind,
  AttemptStatus,
  ContentStatus,
  ContributionStatus,
  Prisma,
  ReportStatus,
  RequestStatus,
  Role,
  UserStatus,
} from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import type { DashboardQueryDto } from '../dto/dashboard-query.dto';

export interface ActivityDay {
  date: string;
  activeStudents: number;
}

export interface ActiveClass {
  code: string;
  label: string;
  totalStudents: number;
  activeStudents: number;
  activityRate: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(query: DashboardQueryDto) {
    const periodDays = query.period ?? 14;
    const now = new Date();
    const today = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    const tomorrow = new Date(today.getTime() + DAY_MS);
    const periodStart = new Date(today.getTime() - (periodDays - 1) * DAY_MS);

    const activeStudentFilter = {
      role: Role.ELEVE,
      status: UserStatus.ACTIF,
      anonymizedAt: null,
    };

    const [
      students,
      teachers,
      classes,
      publishedLessons,
      activeStreak,
      lessonsCompletedToday,
      exercisesSubmittedToday,
      quizzesSubmittedToday,
      pendingContributions,
      openReports,
      pendingClassChanges,
      activity,
      topClasses,
      upcomingEvents,
    ] = await Promise.all([
      this.prisma.user.count({ where: activeStudentFilter }),
      this.prisma.user.count({
        where: {
          role: Role.ENSEIGNANT,
          status: UserStatus.ACTIF,
          anonymizedAt: null,
        },
      }),
      this.prisma.class.count(),
      this.prisma.lesson.count({
        where: { status: ContentStatus.PUBLIE },
      }),
      this.prisma.userStreak.aggregate({
        where: {
          currentStreak: { gt: 0 },
          lastActiveDate: {
            gte: new Date(today.getTime() - DAY_MS),
            lt: tomorrow,
          },
          user: activeStudentFilter,
        },
        _sum: { currentStreak: true },
      }),
      this.prisma.lessonProgress.count({
        where: {
          completedAt: { gte: today, lt: tomorrow },
          user: activeStudentFilter,
        },
      }),
      this.prisma.attempt.count({
        where: {
          status: AttemptStatus.TERMINEE,
          submittedAt: { gte: today, lt: tomorrow },
          assessment: { kind: AssessmentKind.EXERCICE },
          user: activeStudentFilter,
        },
      }),
      this.prisma.attempt.count({
        where: {
          status: AttemptStatus.TERMINEE,
          submittedAt: { gte: today, lt: tomorrow },
          assessment: { kind: AssessmentKind.QUIZ },
          user: activeStudentFilter,
        },
      }),
      this.prisma.contribution.count({
        where: { status: ContributionStatus.EN_ATTENTE },
      }),
      this.prisma.report.count({
        where: { status: ReportStatus.OUVERT },
      }),
      this.prisma.classChangeRequest.count({
        where: { status: RequestStatus.EN_ATTENTE },
      }),
      this.getActivityDays(periodStart, tomorrow),
      this.getActiveClasses(periodStart, tomorrow),
      this.prisma.event.findMany({
        where: {
          status: ContentStatus.PUBLIE,
          startsAt: { gte: now },
        },
        orderBy: { startsAt: 'asc' },
        take: 3,
        select: {
          title: true,
          type: true,
          startsAt: true,
          class: { select: { code: true, label: true } },
          subject: { select: { name: true } },
        },
      }),
    ]);

    return {
      generatedAt: now.toISOString(),
      periodDays,
      totals: {
        students,
        teachers,
        classes,
        publishedLessons,
        activeStreakDays: activeStreak._sum.currentStreak ?? 0,
      },
      today: {
        activeStudents:
          activity.find((day) => day.date === today.toISOString().slice(0, 10))
            ?.activeStudents ?? 0,
        lessonsCompleted: lessonsCompletedToday,
        exercisesSubmitted: exercisesSubmittedToday,
        quizzesSubmitted: quizzesSubmittedToday,
      },
      pending: {
        contributions: pendingContributions,
        reports: openReports,
        classChanges: pendingClassChanges,
      },
      activity,
      topClasses,
      upcomingEvents,
    };
  }

  private getActivityDays(from: Date, toExclusive: Date) {
    return this.prisma.$queryRaw<ActivityDay[]>(Prisma.sql`
      SELECT
        TO_CHAR(al."activityDate", 'YYYY-MM-DD') AS date,
        COUNT(DISTINCT al."userId")::int AS "activeStudents"
      FROM activity_logs al
      INNER JOIN users u ON u.id = al."userId"
      WHERE al."activityDate" >= ${from}::date
        AND al."activityDate" < ${toExclusive}::date
        AND u.role = 'ELEVE'
        AND u.status = 'ACTIF'
        AND u."anonymizedAt" IS NULL
      GROUP BY al."activityDate"
      ORDER BY al."activityDate"
    `);
  }

  private getActiveClasses(from: Date, toExclusive: Date) {
    return this.prisma.$queryRaw<ActiveClass[]>(Prisma.sql`
      SELECT
        c.code,
        c.label,
        COUNT(DISTINCT CASE WHEN u.id IS NOT NULL THEN sp."userId" END)::int
          AS "totalStudents",
        COUNT(DISTINCT al."userId")::int AS "activeStudents",
        COALESCE(
          ROUND(
            COUNT(DISTINCT al."userId") * 100.0
            / NULLIF(
              COUNT(DISTINCT CASE WHEN u.id IS NOT NULL THEN sp."userId" END),
              0
            )
          ),
          0
        )::int AS "activityRate"
      FROM classes c
      LEFT JOIN student_profiles sp ON sp."classId" = c.id
      LEFT JOIN users u
        ON u.id = sp."userId"
        AND u.role = 'ELEVE'
        AND u.status = 'ACTIF'
        AND u."anonymizedAt" IS NULL
      LEFT JOIN activity_logs al
        ON al."userId" = u.id
        AND al."activityDate" >= ${from}::date
        AND al."activityDate" < ${toExclusive}::date
      GROUP BY c.id, c.code, c.label, c."position"
      ORDER BY "activeStudents" DESC, c."position" ASC
      LIMIT 5
    `);
  }
}
