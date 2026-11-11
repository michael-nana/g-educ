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
exports.AssessmentsController = void 0;
const common_1 = require("@nestjs/common");
const assessment_filter_dto_1 = require("../dto/assessment-filter.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const attempt_filter_dto_1 = require("../dto/attempt-filter.dto");
const submit_attempt_dto_1 = require("../dto/submit-attempt.dto");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const update_assessment_dto_1 = require("../dto/update-assessment.dto");
const assessments_service_1 = require("../services/assessments.service");
const create_assessment_dto_1 = require("../dto/create-assessment.dto");
let AssessmentsController = class AssessmentsController {
    assessmentsService;
    constructor(assessmentsService) {
        this.assessmentsService = assessmentsService;
    }
    createExercise(user, chapterId, dto) {
        return this.assessmentsService.create(user, chapterId, dto, 'EXERCICE');
    }
    findPublishedForStudent(user, filters) {
        return this.assessmentsService.findPublishedForStudent(user, filters);
    }
    findPublishedOneForStudent(user, id) {
        return this.assessmentsService.findPublishedOneForStudent(user, id);
    }
    createQuiz(user, chapterId, dto) {
        return this.assessmentsService.create(user, chapterId, dto, 'QUIZ');
    }
    update(user, id, dto) {
        return this.assessmentsService.update(user, id, dto);
    }
    publish(user, id) {
        return this.assessmentsService.publish(user, id);
    }
    archive(user, id) {
        return this.assessmentsService.archive(user, id);
    }
    submitAttempt(user, id, dto) {
        return this.assessmentsService.submitAttempt(user, id, dto);
    }
    findMyAttempts(user, filters) {
        return this.assessmentsService.findMyAttempts(user, filters);
    }
    findMyAttemptById(user, id) {
        return this.assessmentsService.findMyAttemptById(user, id);
    }
};
exports.AssessmentsController = AssessmentsController;
__decorate([
    (0, common_1.Post)('chapters/:chapterId/exercises'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('chapterId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_assessment_dto_1.CreateAssessmentDto]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "createExercise", null);
__decorate([
    (0, common_1.Get)('assessments'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, assessment_filter_dto_1.AssessmentFilterDto]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "findPublishedForStudent", null);
__decorate([
    (0, common_1.Get)('assessments/:id'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "findPublishedOneForStudent", null);
__decorate([
    (0, common_1.Post)('chapters/:chapterId/quizzes'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('chapterId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_assessment_dto_1.CreateAssessmentDto]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Patch)('assessments/:id'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_assessment_dto_1.UpdateAssessmentDto]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('assessments/:id/publish'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "publish", null);
__decorate([
    (0, common_1.Post)('assessments/:id/archive'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "archive", null);
__decorate([
    (0, common_1.Post)('assessments/:id/attempts'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, submit_attempt_dto_1.SubmitAttemptDto]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "submitAttempt", null);
__decorate([
    (0, common_1.Get)('me/attempts'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, attempt_filter_dto_1.AttemptFilterDto]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "findMyAttempts", null);
__decorate([
    (0, common_1.Get)('me/attempts/:id'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "findMyAttemptById", null);
exports.AssessmentsController = AssessmentsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [assessments_service_1.AssessmentsService])
], AssessmentsController);
//# sourceMappingURL=assessments.controller.js.map