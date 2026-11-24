"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const push_module_1 = require("../../common/push/push.module");
const devices_controller_1 = require("./controllers/devices.controller");
const notification_preferences_controller_1 = require("./controllers/notification-preferences.controller");
const my_notifications_controller_1 = require("./controllers/my-notifications.controller");
const announcements_controller_1 = require("./controllers/announcements.controller");
const devices_service_1 = require("./services/devices.service");
const notification_preferences_service_1 = require("./services/notification-preferences.service");
const notifications_service_1 = require("./services/notifications.service");
const announcements_service_1 = require("./services/announcements.service");
const streak_reminder_service_1 = require("./services/streak-reminder.service");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            push_module_1.PushModule,
        ],
        controllers: [
            devices_controller_1.DevicesController,
            notification_preferences_controller_1.NotificationPreferencesController,
            my_notifications_controller_1.MyNotificationsController,
            announcements_controller_1.AnnouncementsController,
        ],
        providers: [
            devices_service_1.DevicesService,
            notification_preferences_service_1.NotificationPreferencesService,
            notifications_service_1.NotificationsService,
            announcements_service_1.AnnouncementsService,
            streak_reminder_service_1.StreakReminderService,
        ],
        exports: [
            notifications_service_1.NotificationsService,
        ],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map