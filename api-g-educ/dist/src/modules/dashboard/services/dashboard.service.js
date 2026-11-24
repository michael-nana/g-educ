"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const DAY_MS = 24 * 60 * 60 * 1000;
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats(query) {
        const periodDays = query.period ?? 14;
        const now = new Date();
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const tomorrow = new Date(today.getTime() + DAY_MS);
        const periodStart = new Date(today.getTime() - (periodDays - 1) * DAY_MS);
        const activeStudentFilter = {
            role: client_1.Role.ELEVE,
            status: client_1.UserStatus.ACTIF,
            anonymizedAt: null,
        };
        const [students, teachers, classes, publishedLessons, activeStreak, lessonsCompletedToday, exercisesSubmittedToday, quizzesSubmittedToday, pendingContributions, openReports, pendingClassChanges, activity, topClasses, upcomingEvents,] = await Promise.all([
            this.prisma.user.count({ where: activeStudentFilter }),
            this.prisma.user.count({
                where: {
                    role: client_1.Role.ENSEIGNANT,
                    status: client_1.UserStatus.ACTIF,
                    anonymizedAt: null,
                },
            }),
            this.prisma.class.count(),
            this.prisma.lesson.count({
                where: { status: client_1.ContentStatus.PUBLIE },
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
                    status: client_1.AttemptStatus.TERMINEE,
                    submittedAt: { gte: today, lt: tomorrow },
                    assessment: { kind: client_1.AssessmentKind.EXERCICE },
                    user: activeStudentFilter,
                },
            }),
            this.prisma.attempt.count({
                where: {
                    status: client_1.AttemptStatus.TERMINEE,
                    submittedAt: { gte: today, lt: tomorrow },
                    assessment: { kind: client_1.AssessmentKind.QUIZ },
                    user: activeStudentFilter,
                },
            }),
            this.prisma.contribution.count({
                where: { status: client_1.ContributionStatus.EN_ATTENTE },
            }),
            this.prisma.report.count({
                where: { status: client_1.ReportStatus.OUVERT },
            }),
            this.prisma.classChangeRequest.count({
                where: { status: client_1.RequestStatus.EN_ATTENTE },
            }),
            this.getActivityDays(periodStart, tomorrow),
            this.getActiveClasses(periodStart, tomorrow),
            this.prisma.event.findMany({
                where: {
                    status: client_1.ContentStatus.PUBLIE,
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
                activeStudents: activity.find((day) => day.date === today.toISOString().slice(0, 10))
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
    getActivityDays(from, toExclusive) {
        return this.prisma.$queryRaw(client_1.Prisma.sql `
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
    getActiveClasses(from, toExclusive) {
        return this.prisma.$queryRaw(client_1.Prisma.sql `
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map