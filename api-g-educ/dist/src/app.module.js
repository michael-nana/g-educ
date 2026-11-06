"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_cls_1 = require("nestjs-cls");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const environment_validation_1 = require("./common/config/environment.validation");
const sms_module_1 = require("./common/sms/sms.module");
const cls_module_1 = require("./common/cls/cls.module");
const schedule_1 = require("@nestjs/schedule");
const prisma_module_1 = require("./prisma/prisma.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const audit_module_1 = require("./modules/audit/audit.module");
const academics_module_1 = require("./modules/academics/academics.module");
const users_module_1 = require("./modules/users/users.module");
const gamification_module_1 = require("./modules/gamification/gamification.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: environment_validation_1.validateEnvironment,
            }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60_000, limit: 30 }]),
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: {
                    mount: true,
                    setup: (cls, req) => {
                        cls.set('ipAddress', req.ip);
                    },
                },
            }),
            prisma_module_1.PrismaModule,
            sms_module_1.SmsModule,
            cls_module_1.ContextClsModule,
            auth_module_1.AuthModule,
            audit_module_1.AuditModule,
            academics_module_1.AcademicsModule,
            users_module_1.UsersModule,
            gamification_module_1.GamificationModule,
            schedule_1.ScheduleModule.forRoot(),
            notifications_module_1.NotificationsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map