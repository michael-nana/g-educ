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
var StreakReminderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreakReminderService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const notifications_service_1 = require("./notifications.service");
let StreakReminderService = StreakReminderService_1 = class StreakReminderService {
    notificationsService;
    logger = new common_1.Logger(StreakReminderService_1.name);
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async sendReminders() {
        try {
            const now = new Date();
            const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
            const currentTime = new Intl.DateTimeFormat('fr-FR', {
                timeZone: 'Africa/Ouagadougou',
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h23',
            }).format(now);
            const result = await this.notificationsService.notifyStreakReminders(today, currentTime);
            if (result.skipped) {
                return;
            }
            if (result.created > 0) {
                this.logger.log(`${result.created} rappel(s) de flamme créé(s). ${result.pushSent} envoi(s) Push réussi(s).`);
            }
        }
        catch (error) {
            this.logger.error('Erreur pendant le traitement des rappels de flamme.', error instanceof Error ? error.stack : String(error));
        }
    }
};
exports.StreakReminderService = StreakReminderService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE, {
        timeZone: 'Africa/Ouagadougou',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StreakReminderService.prototype, "sendReminders", null);
exports.StreakReminderService = StreakReminderService = StreakReminderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], StreakReminderService);
//# sourceMappingURL=streak-reminder.service.js.map