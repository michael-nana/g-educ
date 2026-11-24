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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesController = exports.MeGamificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("../../../generated/prisma/client");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const record_activity_dto_1 = require("../dto/record-activity.dto");
const activity_query_dto_1 = require("../dto/activity-query.dto");
const gamification_service_1 = require("../services/gamification.service");
let MeGamificationController = class MeGamificationController {
    gamificationService;
    constructor(gamificationService) {
        this.gamificationService = gamificationService;
    }
    getStreak(user) {
        return this.gamificationService.getStreak(user.id);
    }
    getActivity(user, query) {
        return this.gamificationService.getActivityCalendar(user.id, query);
    }
};
exports.MeGamificationController = MeGamificationController;
__decorate([
    (0, common_1.Get)('streak'),
    (0, swagger_1.ApiOperation)({ summary: 'Consulter ma flamme' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MeGamificationController.prototype, "getStreak", null);
__decorate([
    (0, common_1.Get)('activity'),
    (0, swagger_1.ApiOperation)({ summary: 'Consulter mon calendrier d’activité' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, activity_query_dto_1.ActivityQueryDto]),
    __metadata("design:returntype", void 0)
], MeGamificationController.prototype, "getActivity", null);
exports.MeGamificationController = MeGamificationController = __decorate([
    (0, swagger_1.ApiTags)('Gamification - Mon activité'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ELEVE),
    (0, common_1.Controller)('me'),
    __metadata("design:paramtypes", [gamification_service_1.GamificationService])
], MeGamificationController);
let ActivitiesController = class ActivitiesController {
    gamificationService;
    constructor(gamificationService) {
        this.gamificationService = gamificationService;
    }
    recordActivity(user, dto) {
        return this.gamificationService.recordActivityForUser({
            id: user.id,
            classId: user.classId,
        }, {
            userId: user.id,
            clientId: dto.clientId,
            type: dto.type,
            refType: dto.refType,
            refId: dto.refId,
            occurredAt: new Date(dto.occurredAt),
        });
    }
};
exports.ActivitiesController = ActivitiesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Enregistrer une activité' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, record_activity_dto_1.RecordActivityDto]),
    __metadata("design:returntype", void 0)
], ActivitiesController.prototype, "recordActivity", null);
exports.ActivitiesController = ActivitiesController = __decorate([
    (0, swagger_1.ApiTags)('Gamification - Activités'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ELEVE),
    (0, common_1.Controller)('activities'),
    __metadata("design:paramtypes", [gamification_service_1.GamificationService])
], ActivitiesController);
//# sourceMappingURL=gamification.controller.js.map