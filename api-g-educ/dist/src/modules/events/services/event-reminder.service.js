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
var EventReminderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventReminderService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const notifications_service_1 = require("../../notifications/services/notifications.service");
let EventReminderService = EventReminderService_1 = class EventReminderService {
    prisma;
    notificationsService;
    logger = new common_1.Logger(EventReminderService_1.name);
    maxAttempts = 3;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async sendReminders() {
        this.logger.log('Déclenchement du worker des rappels.');
        try {
            await this.prisma.$transaction(async (tx) => {
                const reminders = await tx.$queryRaw `
  SELECT
    reminder."id",
    event."id" AS "eventId",
    event."classId",
    event."title"
  FROM "event_reminders" AS reminder
  INNER JOIN "events" AS event
    ON event."id" = reminder."eventId"
  WHERE
    reminder."status" = 'PLANIFIE'
    AND reminder."remindAt" <= NOW()
    AND event."status" = 'PUBLIE'
  ORDER BY reminder."remindAt" ASC
  LIMIT 50
  FOR UPDATE OF reminder SKIP LOCKED
`;
                this.logger.log(`${reminders.length} rappel(s) à traiter.`);
                for (const reminder of reminders) {
                    try {
                        await this.notificationsService.notifyClass(reminder.classId, {
                            type: client_1.NotificationType.EVENEMENT_RAPPEL,
                            title: 'Rappel d’événement',
                            body: reminder.title,
                            data: {
                                eventId: reminder.eventId,
                            },
                        });
                        await tx.eventReminder.update({
                            where: { id: reminder.id },
                            data: {
                                status: client_1.ReminderStatus.ENVOYE,
                                sentAt: new Date(),
                            },
                        });
                        this.logger.log(`Rappel ${reminder.id} traité avec succès.`);
                    }
                    catch (error) {
                        const nextAttempts = 1;
                        const current = await tx.eventReminder.findUnique({
                            where: { id: reminder.id },
                            select: { attempts: true },
                        });
                        const attempts = (current?.attempts ?? 0) + nextAttempts;
                        await tx.eventReminder.update({
                            where: { id: reminder.id },
                            data: {
                                attempts: {
                                    increment: nextAttempts,
                                },
                                ...(attempts >= this.maxAttempts
                                    ? { status: client_1.ReminderStatus.ECHEC }
                                    : {}),
                            },
                        });
                        this.logger.error(`Échec du rappel ${reminder.id} (tentative ${attempts}/${this.maxAttempts}).`, error instanceof Error
                            ? error.stack
                            : String(error));
                    }
                }
            }, {
                maxWait: 10000,
                timeout: 60000,
            });
        }
        catch (error) {
            this.logger.error('Erreur pendant le traitement des rappels d’événements.', error instanceof Error
                ? error.stack
                : String(error));
        }
    }
};
exports.EventReminderService = EventReminderService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE, {
        timeZone: 'Africa/Ouagadougou',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventReminderService.prototype, "sendReminders", null);
exports.EventReminderService = EventReminderService = EventReminderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], EventReminderService);
//# sourceMappingURL=event-reminder.service.js.map