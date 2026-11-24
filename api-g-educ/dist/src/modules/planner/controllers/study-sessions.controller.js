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
exports.StudySessionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const create_study_session_dto_1 = require("../dto/create-study-session.dto");
const update_study_session_dto_1 = require("../dto/update-study-session.dto");
const filter_study_sessions_dto_1 = require("../dto/filter-study-sessions.dto");
const study_sessions_service_1 = require("../services/study-sessions.service");
let StudySessionsController = class StudySessionsController {
    studySessionsService;
    constructor(studySessionsService) {
        this.studySessionsService = studySessionsService;
    }
    create(user, dto) {
        return this.studySessionsService.create(user.id, dto);
    }
    findAll(user, filters) {
        return this.studySessionsService.findAll(user.id, filters);
    }
    update(user, id, dto) {
        return this.studySessionsService.update(user.id, id, dto);
    }
    remove(user, id) {
        return this.studySessionsService.remove(user.id, id);
    }
};
exports.StudySessionsController = StudySessionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Créer une séance de révision',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_study_session_dto_1.CreateStudySessionDto]),
    __metadata("design:returntype", void 0)
], StudySessionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Consulter les séances de révision',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_study_sessions_dto_1.FilterStudySessionsDto]),
    __metadata("design:returntype", void 0)
], StudySessionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Modifier une séance de révision',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_study_session_dto_1.UpdateStudySessionDto]),
    __metadata("design:returntype", void 0)
], StudySessionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Supprimer logiquement une séance de révision',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StudySessionsController.prototype, "remove", null);
exports.StudySessionsController = StudySessionsController = __decorate([
    (0, swagger_1.ApiTags)('Study Sessions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('study-sessions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ELEVE'),
    __metadata("design:paramtypes", [study_sessions_service_1.StudySessionsService])
], StudySessionsController);
//# sourceMappingURL=study-sessions.controller.js.map