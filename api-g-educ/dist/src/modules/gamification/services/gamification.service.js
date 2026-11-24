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
exports.GamificationService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const FUTURE_TOLERANCE_MS = 5 * 60 * 1000;
const MAX_ACTIVITY_AGE_MS = 48 * 60 * 60 * 1000;
const MAX_CALENDAR_DAYS = 366;
let GamificationService = class GamificationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toUtcDay(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }
    dateKey(date) {
        return this.toUtcDay(date).toISOString().slice(0, 10);
    }
    addDays(date, days) {
        const result = this.toUtcDay(date);
        result.setUTCDate(result.getUTCDate() + days);
        return result;
    }
    differenceInDays(first, second) {
        return Math.round((this.toUtcDay(second).getTime() -
            this.toUtcDay(first).getTime()) /
            86_400_000);
    }
    validateOccurredAt(occurredAt) {
        if (Number.isNaN(occurredAt.getTime())) {
            throw new common_1.BadRequestException('Date d’activité invalide');
        }
        const now = Date.now();
        const timestamp = occurredAt.getTime();
        if (timestamp > now + FUTURE_TOLERANCE_MS) {
            throw new common_1.BadRequestException('Une activité ne peut pas être enregistrée dans le futur');
        }
        if (timestamp < now - MAX_ACTIVITY_AGE_MS) {
            throw new common_1.BadRequestException('Une activité datant de plus de 48 heures ne peut pas être enregistrée');
        }
        return this.toUtcDay(occurredAt);
    }
    isStreakActivity(type) {
        return (type !== client_1.ActivityType.CONTRIBUTION_PUBLIEE &&
            type !== client_1.ActivityType.FORUM_REPONSE);
    }
    async validateActivityReference(tx, user, input) {
        if (input.type === client_1.ActivityType.CONTRIBUTION_PUBLIEE) {
            throw new common_1.BadRequestException('La publication d’une contribution est enregistrée par le serveur');
        }
        if (input.type === client_1.ActivityType.LECON_TERMINEE &&
            input.refType === client_1.ActivityRefType.LESSON) {
            if (!user.classId) {
                throw new common_1.BadRequestException('Classe de l’élève introuvable');
            }
            const progress = await tx.lessonProgress.findFirst({
                where: {
                    userId: user.id,
                    lessonId: input.refId,
                    completedAt: { not: null },
                    lesson: {
                        classId: user.classId,
                        status: client_1.ContentStatus.PUBLIE,
                    },
                },
                select: { id: true },
            });
            if (!progress) {
                throw new common_1.NotFoundException('Leçon terminée introuvable pour cet élève');
            }
            return;
        }
        if ((input.type === client_1.ActivityType.EXERCICE_TERMINE ||
            input.type === client_1.ActivityType.QUIZ_TERMINE) &&
            input.refType === client_1.ActivityRefType.ASSESSMENT) {
            if (!user.classId) {
                throw new common_1.BadRequestException('Classe de l’élève introuvable');
            }
            const expectedKind = input.type === client_1.ActivityType.EXERCICE_TERMINE
                ? client_1.AssessmentKind.EXERCICE
                : client_1.AssessmentKind.QUIZ;
            const attempt = await tx.attempt.findFirst({
                where: {
                    userId: user.id,
                    assessmentId: input.refId,
                    status: client_1.AttemptStatus.TERMINEE,
                    assessment: {
                        classId: user.classId,
                        status: client_1.ContentStatus.PUBLIE,
                        kind: expectedKind,
                    },
                },
                select: { id: true },
            });
            if (!attempt) {
                throw new common_1.NotFoundException('Tentative terminée introuvable pour cet élève');
            }
            return;
        }
        if (input.type === client_1.ActivityType.FORUM_REPONSE &&
            input.refType === client_1.ActivityRefType.FORUM_ANSWER) {
            const answer = await tx.forumAnswer.findFirst({
                where: {
                    id: input.refId,
                    authorId: user.id,
                },
                select: { id: true },
            });
            if (!answer) {
                throw new common_1.NotFoundException('Réponse du forum introuvable pour cet élève');
            }
            return;
        }
        throw new common_1.BadRequestException('Le type d’activité ne correspond pas au type de référence');
    }
    async recordActivity(tx, input) {
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
        if (inserted.count === 0) {
            return {
                recorded: false,
                duplicate: true,
                streakUpdated: false,
            };
        }
        if (!this.isStreakActivity(input.type)) {
            return {
                recorded: true,
                duplicate: false,
                streakUpdated: false,
            };
        }
        await tx.userStreak.upsert({
            where: { userId: input.userId },
            create: {
                userId: input.userId,
                currentStreak: 0,
                longestStreak: 0,
            },
            update: {},
        });
        await tx.$queryRaw `
      SELECT "userId"
      FROM "user_streaks"
      WHERE "userId" = ${input.userId}::uuid
      FOR UPDATE
    `;
        const streak = await tx.userStreak.findUniqueOrThrow({
            where: { userId: input.userId },
        });
        if (streak.lastActiveDate &&
            activityDate.getTime() < this.toUtcDay(streak.lastActiveDate).getTime()) {
            return {
                recorded: true,
                duplicate: false,
                streakUpdated: false,
            };
        }
        let currentStreak = streak.currentStreak;
        if (!streak.lastActiveDate) {
            currentStreak = 1;
        }
        else {
            const difference = this.differenceInDays(streak.lastActiveDate, activityDate);
            if (difference === 0) {
                return {
                    recorded: true,
                    duplicate: false,
                    streakUpdated: false,
                };
            }
            if (difference === 1) {
                currentStreak += 1;
            }
            else {
                currentStreak = 1;
            }
        }
        const longestStreak = Math.max(streak.longestStreak, currentStreak);
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
    async recordActivityForUser(user, input) {
        return this.prisma.$transaction(async (tx) => {
            await this.validateActivityReference(tx, user, input);
            return this.recordActivity(tx, input);
        });
    }
    async recordServerActivity(tx, input) {
        return this.recordActivity(tx, {
            ...input,
            clientId: (0, crypto_1.randomUUID)(),
        });
    }
    async getStreak(userId) {
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
        const isCurrent = streak.lastActiveDate !== null &&
            this.toUtcDay(streak.lastActiveDate).getTime() >=
                yesterday.getTime();
        return {
            currentStreak: isCurrent ? streak.currentStreak : 0,
            longestStreak: streak.longestStreak,
            lastActiveDate: streak.lastActiveDate,
        };
    }
    async getActivityCalendar(userId, query) {
        const today = this.toUtcDay(new Date());
        const to = query.to
            ? this.toUtcDay(new Date(`${query.to}T00:00:00.000Z`))
            : today;
        const from = query.from
            ? this.toUtcDay(new Date(`${query.from}T00:00:00.000Z`))
            : this.addDays(to, -29);
        if (Number.isNaN(from.getTime()) ||
            Number.isNaN(to.getTime())) {
            throw new common_1.BadRequestException('Période invalide');
        }
        if (from.getTime() > to.getTime()) {
            throw new common_1.BadRequestException('La date de début doit précéder la date de fin');
        }
        const numberOfDays = this.differenceInDays(from, to) + 1;
        if (numberOfDays > MAX_CALENDAR_DAYS) {
            throw new common_1.BadRequestException(`La période ne peut pas dépasser ${MAX_CALENDAR_DAYS} jours`);
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
        const activeDays = activities.map((activity) => this.dateKey(activity.activityDate));
        return {
            from: this.dateKey(from),
            to: this.dateKey(to),
            activeDays,
            totalActiveDays: activeDays.length,
        };
    }
    async recomputeStreak(userId) {
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
            await tx.$queryRaw `
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
                            client_1.ActivityType.CONTRIBUTION_PUBLIEE,
                            client_1.ActivityType.FORUM_REPONSE,
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
                ...new Set(activities.map((activity) => this.dateKey(activity.activityDate))),
            ].map((date) => new Date(`${date}T00:00:00.000Z`));
            let longestStreak = 0;
            let runningStreak = 0;
            for (let i = 0; i < dates.length; i++) {
                if (i > 0 &&
                    this.differenceInDays(dates[i - 1], dates[i]) === 1) {
                    runningStreak += 1;
                }
                else {
                    runningStreak = 1;
                }
                longestStreak = Math.max(longestStreak, runningStreak);
            }
            const currentStreak = runningStreak;
            const lastActiveDate = dates.length > 0 ? dates[dates.length - 1] : null;
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
};
exports.GamificationService = GamificationService;
exports.GamificationService = GamificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GamificationService);
//# sourceMappingURL=gamification.service.js.map