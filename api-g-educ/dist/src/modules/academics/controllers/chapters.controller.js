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
exports.ChaptersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const chapters_service_1 = require("../services/chapters.service");
const create_chapter_dto_1 = require("../dto/create-chapter.dto");
const update_chapter_dto_1 = require("../dto/update-chapter.dto");
const reorder_chapters_dto_1 = require("../dto/reorder-chapters.dto");
let ChaptersController = class ChaptersController {
    chaptersService;
    constructor(chaptersService) {
        this.chaptersService = chaptersService;
    }
    create(user, classSubjectId, dto) {
        return this.chaptersService.create(user, classSubjectId, dto);
    }
    update(user, id, dto) {
        return this.chaptersService.update(user, id, dto);
    }
    publish(user, id) {
        return this.chaptersService.publish(user, id);
    }
    archive(user, id) {
        return this.chaptersService.archive(user, id);
    }
    reorder(user, classSubjectId, dto) {
        return this.chaptersService.reorder(user, classSubjectId, dto);
    }
    findMyChapters(user, classSubjectId) {
        return this.chaptersService.findMyChapters(user, classSubjectId);
    }
};
exports.ChaptersController = ChaptersController;
__decorate([
    (0, common_1.Post)('class-subjects/:classSubjectId/chapters'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('classSubjectId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_chapter_dto_1.CreateChapterDto]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('chapters/:id'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_chapter_dto_1.UpdateChapterDto]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('chapters/:id/publish'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "publish", null);
__decorate([
    (0, common_1.Post)('chapters/:id/archive'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "archive", null);
__decorate([
    (0, common_1.Put)('class-subjects/:classSubjectId/chapters/order'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('classSubjectId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, reorder_chapters_dto_1.ReorderChaptersDto]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "reorder", null);
__decorate([
    (0, common_1.Get)('me/chapters'),
    (0, roles_decorator_1.Roles)('ELEVE'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('classSubjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChaptersController.prototype, "findMyChapters", null);
exports.ChaptersController = ChaptersController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [chapters_service_1.ChaptersService])
], ChaptersController);
//# sourceMappingURL=chapters.controller.js.map