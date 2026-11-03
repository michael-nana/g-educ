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
exports.ClassSubjectsController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const assign_subject_dto_1 = require("../dto/assign-subject.dto");
const class_subjects_service_1 = require("../services/class-subjects.service");
let ClassSubjectsController = class ClassSubjectsController {
    classSubjectsService;
    constructor(classSubjectsService) {
        this.classSubjectsService = classSubjectsService;
    }
    assign(classId, dto) {
        return this.classSubjectsService.assign(classId, dto);
    }
};
exports.ClassSubjectsController = ClassSubjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMINISTRATEUR),
    __param(0, (0, common_1.Param)('classId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_subject_dto_1.AssignSubjectDto]),
    __metadata("design:returntype", void 0)
], ClassSubjectsController.prototype, "assign", null);
exports.ClassSubjectsController = ClassSubjectsController = __decorate([
    (0, common_1.Controller)('classes/:classId/subjects'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [class_subjects_service_1.ClassSubjectsService])
], ClassSubjectsController);
//# sourceMappingURL=class-subjects.controller.js.map