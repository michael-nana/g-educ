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
exports.NotificationPreferencesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let NotificationPreferencesService = class NotificationPreferencesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get(user) {
        return this.prisma.notificationPreference.upsert({
            where: { userId: user.id },
            create: {
                userId: user.id,
            },
            update: {},
            select: {
                eventsEnabled: true,
                streakReminder: true,
                streakReminderTime: true,
                forumEnabled: true,
                updatedAt: true,
            },
        });
    }
    async update(user, dto) {
        return this.prisma.notificationPreference.upsert({
            where: { userId: user.id },
            create: {
                userId: user.id,
                ...dto,
            },
            update: {
                ...dto,
            },
            select: {
                eventsEnabled: true,
                streakReminder: true,
                streakReminderTime: true,
                forumEnabled: true,
                updatedAt: true,
            },
        });
    }
};
exports.NotificationPreferencesService = NotificationPreferencesService;
exports.NotificationPreferencesService = NotificationPreferencesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationPreferencesService);
//# sourceMappingURL=notification-preferences.service.js.map