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
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const push_service_1 = require("../../../common/push/push.service");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    prisma;
    pushService;
    logger = new common_1.Logger(NotificationsService_1.name);
    constructor(prisma, pushService) {
        this.prisma = prisma;
        this.pushService = pushService;
    }
    isEnabled(type, preference) {
        if (!preference) {
            return true;
        }
        switch (type) {
            case client_1.NotificationType.EVENEMENT_ANNONCE:
            case client_1.NotificationType.EVENEMENT_RAPPEL:
                return preference.eventsEnabled;
            case client_1.NotificationType.FLAMME_RAPPEL:
                return preference.streakReminder;
            case client_1.NotificationType.FORUM_REPONSE:
                return preference.forumEnabled;
            case client_1.NotificationType.CONTRIBUTION_DECISION:
            case client_1.NotificationType.SANCTION:
            case client_1.NotificationType.SYSTEME:
                return true;
            default:
                return true;
        }
    }
    async notifyUsers(userIds, payload) {
        const uniqueIds = [...new Set(userIds)];
        if (uniqueIds.length === 0) {
            return {
                created: 0,
                pushSent: 0,
            };
        }
        const users = await this.prisma.user.findMany({
            where: {
                id: { in: uniqueIds },
                anonymizedAt: null,
            },
            select: {
                id: true,
                notificationPreference: {
                    select: {
                        eventsEnabled: true,
                        streakReminder: true,
                        forumEnabled: true,
                    },
                },
                deviceTokens: {
                    select: {
                        token: true,
                    },
                },
            },
        });
        const eligibleUsers = users.filter((user) => this.isEnabled(payload.type, user.notificationPreference));
        if (eligibleUsers.length === 0) {
            return {
                created: 0,
                pushSent: 0,
            };
        }
        const notifications = await Promise.all(eligibleUsers.map((user) => this.prisma.notification.create({
            data: {
                userId: user.id,
                type: payload.type,
                title: payload.title,
                body: payload.body,
                ...(payload.data !== undefined && {
                    data: payload.data,
                }),
            },
            select: {
                id: true,
                userId: true,
            },
        })));
        const tokenOwners = new Map();
        for (const user of eligibleUsers) {
            for (const device of user.deviceTokens) {
                tokenOwners.set(device.token, user.id);
            }
        }
        const tokens = [...tokenOwners.keys()];
        if (tokens.length === 0) {
            return {
                created: notifications.length,
                pushSent: 0,
            };
        }
        let pushResult;
        try {
            pushResult = await this.pushService.sendToTokens(tokens, {
                title: payload.title,
                body: payload.body,
                data: this.toPushData(payload.data),
            });
        }
        catch (error) {
            this.logger.error('Erreur pendant l’envoi des notifications Push.', error instanceof Error ? error.stack : String(error));
            return {
                created: notifications.length,
                pushSent: 0,
            };
        }
        if (pushResult.invalidTokens.length > 0) {
            await this.prisma.deviceToken.deleteMany({
                where: {
                    token: {
                        in: pushResult.invalidTokens,
                    },
                },
            });
        }
        const successfulUserIds = new Set(pushResult.successTokens
            .map((token) => tokenOwners.get(token))
            .filter((id) => Boolean(id)));
        const successfulNotificationIds = notifications
            .filter((notification) => successfulUserIds.has(notification.userId))
            .map((notification) => notification.id);
        if (successfulNotificationIds.length > 0) {
            await this.prisma.notification.updateMany({
                where: {
                    id: {
                        in: successfulNotificationIds,
                    },
                },
                data: {
                    sentAt: new Date(),
                },
            });
        }
        return {
            created: notifications.length,
            pushSent: successfulUserIds.size,
        };
    }
    async notifyStreakReminders(today, currentTime) {
        const prepared = await this.prisma.$transaction(async (tx) => {
            const lock = await tx.$queryRaw `
        SELECT pg_try_advisory_xact_lock(741852, 1) AS locked
      `;
            if (!lock[0]?.locked) {
                return null;
            }
            const students = await tx.user.findMany({
                where: {
                    role: client_1.Role.ELEVE,
                    status: client_1.UserStatus.ACTIF,
                    anonymizedAt: null,
                },
                select: {
                    id: true,
                    streak: {
                        select: {
                            currentStreak: true,
                            lastActiveDate: true,
                        },
                    },
                    notificationPreference: {
                        select: {
                            streakReminder: true,
                            streakReminderTime: true,
                        },
                    },
                    deviceTokens: {
                        select: {
                            token: true,
                        },
                    },
                },
            });
            const eligibleStudents = students.filter((student) => {
                const streak = student.streak;
                const preference = student.notificationPreference;
                if (!streak || streak.currentStreak <= 0) {
                    return false;
                }
                if (!streak.lastActiveDate ||
                    streak.lastActiveDate.getTime() >= today.getTime()) {
                    return false;
                }
                if (preference?.streakReminder === false) {
                    return false;
                }
                const reminderTime = preference?.streakReminderTime ?? '18:00';
                return reminderTime === currentTime;
            });
            if (eligibleStudents.length === 0) {
                return {
                    notifications: [],
                    tokenOwners: [],
                };
            }
            const userIds = eligibleStudents.map((student) => student.id);
            const alreadyNotified = await tx.notification.findMany({
                where: {
                    userId: { in: userIds },
                    type: client_1.NotificationType.FLAMME_RAPPEL,
                    createdAt: {
                        gte: today,
                    },
                },
                select: {
                    userId: true,
                },
            });
            const notifiedIds = new Set(alreadyNotified.map((notification) => notification.userId));
            const recipients = eligibleStudents.filter((student) => !notifiedIds.has(student.id));
            if (recipients.length === 0) {
                return {
                    notifications: [],
                    tokenOwners: [],
                };
            }
            const notifications = [];
            for (const student of recipients) {
                const notification = await tx.notification.create({
                    data: {
                        userId: student.id,
                        type: client_1.NotificationType.FLAMME_RAPPEL,
                        title: 'N’oublie pas ta flamme !',
                        body: 'Fais une activité aujourd’hui pour préserver ta série.',
                        data: {
                            screen: 'gamification',
                            type: 'streak-reminder',
                        },
                    },
                    select: {
                        id: true,
                        userId: true,
                    },
                });
                notifications.push(notification);
            }
            const tokenOwners = new Map();
            for (const student of recipients) {
                for (const device of student.deviceTokens) {
                    tokenOwners.set(device.token, student.id);
                }
            }
            return {
                notifications,
                tokenOwners: [...tokenOwners.entries()],
            };
        });
        if (prepared === null) {
            return {
                created: 0,
                pushSent: 0,
                skipped: true,
            };
        }
        const { notifications, tokenOwners } = prepared;
        if (notifications.length === 0) {
            return {
                created: 0,
                pushSent: 0,
                skipped: false,
            };
        }
        const ownerByToken = new Map(tokenOwners);
        const tokens = [...ownerByToken.keys()];
        if (tokens.length === 0) {
            return {
                created: notifications.length,
                pushSent: 0,
                skipped: false,
            };
        }
        try {
            const pushResult = await this.pushService.sendToTokens(tokens, {
                title: 'N’oublie pas ta flamme !',
                body: 'Fais une activité aujourd’hui pour préserver ta série.',
                data: {
                    screen: 'gamification',
                    type: 'streak-reminder',
                },
            });
            if (pushResult.invalidTokens.length > 0) {
                await this.prisma.deviceToken.deleteMany({
                    where: {
                        token: {
                            in: pushResult.invalidTokens,
                        },
                    },
                });
            }
            const successfulUserIds = new Set(pushResult.successTokens
                .map((token) => ownerByToken.get(token))
                .filter((id) => Boolean(id)));
            const successfulNotificationIds = notifications
                .filter((notification) => successfulUserIds.has(notification.userId))
                .map((notification) => notification.id);
            if (successfulNotificationIds.length > 0) {
                await this.prisma.notification.updateMany({
                    where: {
                        id: {
                            in: successfulNotificationIds,
                        },
                    },
                    data: {
                        sentAt: new Date(),
                    },
                });
            }
            return {
                created: notifications.length,
                pushSent: successfulUserIds.size,
                skipped: false,
            };
        }
        catch (error) {
            this.logger.error('Erreur pendant l’envoi des rappels Push.', error instanceof Error ? error.stack : String(error));
            return {
                created: notifications.length,
                pushSent: 0,
                skipped: false,
            };
        }
    }
    async notifyClass(classId, payload) {
        const students = await this.prisma.user.findMany({
            where: {
                role: client_1.Role.ELEVE,
                status: client_1.UserStatus.ACTIF,
                anonymizedAt: null,
                studentProfile: {
                    is: {
                        classId,
                    },
                },
            },
            select: {
                id: true,
            },
        });
        return this.notifyUsers(students.map((student) => student.id), payload);
    }
    async list(user, dto) {
        const page = Math.max(1, Number(dto.page ?? 1));
        const limit = Math.min(100, Math.max(1, Number(dto.limit ?? 20)));
        const where = {
            userId: user.id,
            ...(dto.unread === true && {
                readAt: null,
            }),
        };
        const [items, total, unreadCount] = await Promise.all([
            this.prisma.notification.findMany({
                where,
                orderBy: {
                    createdAt: 'desc',
                },
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    type: true,
                    title: true,
                    body: true,
                    data: true,
                    sentAt: true,
                    readAt: true,
                    createdAt: true,
                },
            }),
            this.prisma.notification.count({ where }),
            this.prisma.notification.count({
                where: {
                    userId: user.id,
                    readAt: null,
                },
            }),
        ]);
        return {
            data: items,
            unreadCount,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async markAsRead(user, notificationId) {
        const result = await this.prisma.notification.updateMany({
            where: {
                id: notificationId,
                userId: user.id,
                readAt: null,
            },
            data: {
                readAt: new Date(),
            },
        });
        if (result.count === 0) {
            const notification = await this.prisma.notification.findFirst({
                where: {
                    id: notificationId,
                    userId: user.id,
                },
                select: {
                    id: true,
                },
            });
            if (!notification) {
                throw new common_1.NotFoundException('Notification introuvable.');
            }
            return {
                message: 'Cette notification est déjà lue.',
                updated: false,
            };
        }
        return {
            message: 'Notification marquée comme lue.',
            updated: true,
        };
    }
    async markAllAsRead(user) {
        const result = await this.prisma.notification.updateMany({
            where: {
                userId: user.id,
                readAt: null,
            },
            data: {
                readAt: new Date(),
            },
        });
        return {
            message: 'Notifications marquées comme lues.',
            updatedCount: result.count,
        };
    }
    toPushData(data) {
        if (!data) {
            return {};
        }
        return Object.fromEntries(Object.entries(data).map(([key, value]) => [
            key,
            typeof value === 'string'
                ? value
                : JSON.stringify(value) ?? String(value),
        ]));
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        push_service_1.PushService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map