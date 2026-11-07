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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const lessons_service_1 = require("../services/lessons.service");
const create_lesson_dto_1 = require("../dto/create-lesson.dto");
const update_lesson_dto_1 = require("../dto/update-lesson.dto");
const lesson_filter_dto_1 = require("../dto/lesson-filter.dto");
const update_lesson_progress_dto_1 = require("../dto/update-lesson-progress.dto");
let LessonsController = class LessonsController {
    lessonsService;
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    create(user, chapterId, dto) {
        return this.lessonsService.create(user, chapterId, dto);
    }
    update(user, id, dto) {
        return this.lessonsService.update(user, id, dto);
    }
    uploadAsset(user, id, file) {
        return this.lessonsService.uploadPdfAsset(user, id, file);
    }
    deleteAsset(user, id, assetId) {
        return this.lessonsService.deleteAsset(user, id, assetId);
    }
    publish(user, id) {
        return this.lessonsService.publish(user, id);
    }
    archive(user, id) {
        return this.lessonsService.archive(user, id);
    }
    findAll(user, filters) {
        return this.lessonsService.findAll(user, filters);
    }
    findOne(user, id) {
        return this.lessonsService.findOne(user, id);
    }
    addFavorite(user, id) {
        return this.lessonsService.addFavorite(user, id);
    }
    removeFavorite(user, id) {
        return this.lessonsService.removeFavorite(user, id);
    }
    updateProgress(user, id, dto) {
        return this.lessonsService.updateProgress(user, id, dto);
    }
    findMyProgress(user) {
        return this.lessonsService.findMyProgress(user);
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, common_1.Post)('chapters/:chapterId/lessons'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une leçon' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('chapterId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('lessons/:id'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier une leçon' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('lessons/:id/assets'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    (0, common_2.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: {
            fileSize: 20 * 1024 * 1024,
            files: 1,
        },
    })),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_2.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "uploadAsset", null);
__decorate([
    (0, common_1.Delete)('lessons/:id/assets/:assetId'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Param)('assetId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "deleteAsset", null);
__decorate([
    (0, common_1.Post)('lessons/:id/publish'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Publier une leçon' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "publish", null);
__decorate([
    (0, common_1.Post)('lessons/:id/archive'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Archiver une leçon' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "archive", null);
__decorate([
    (0, common_1.Get)('lessons'),
    (0, roles_decorator_1.Roles)('ELEVE', 'ADMINISTRATEUR', 'ENSEIGNANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les leçons' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lesson_filter_dto_1.LessonFilterDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('lessons/:id'),
    (0, roles_decorator_1.Roles)('ELEVE', 'ADMINISTRATEUR', 'ENSEIGNANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d’une leçon' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('lessons/:id/favorite'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter aux favoris' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Delete)('lessons/:id/favorite'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    (0, swagger_1.ApiOperation)({ summary: 'Retirer des favoris' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "removeFavorite", null);
__decorate([
    (0, common_1.Put)('lessons/:id/progress'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour la progression' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_lesson_progress_dto_1.UpdateLessonProgressDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Get)('me/progress/lessons'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    (0, swagger_1.ApiOperation)({ summary: 'Reprendre les leçons' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findMyProgress", null);
exports.LessonsController = LessonsController = __decorate([
    (0, swagger_1.ApiTags)('Courses - Lessons'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], LessonsController);
//# sourceMappingURL=lessons.controller.js.map