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
exports.AnnalImportController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const annal_import_service_1 = require("../services/annal-import.service");
let AnnalImportController = class AnnalImportController {
    annalImportService;
    constructor(annalImportService) {
        this.annalImportService = annalImportService;
    }
    import(user, chapterId, file) {
        if (!chapterId)
            throw new common_1.BadRequestException('Choisissez un chapitre.');
        return this.annalImportService.importPdf(user, chapterId, file);
    }
};
exports.AnnalImportController = AnnalImportController;
__decorate([
    (0, common_1.Post)('import'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'ENSEIGNANT'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 20 * 1024 * 1024, files: 1 },
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Importer un annal PDF et préparer les brouillons' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('chapterId')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], AnnalImportController.prototype, "import", null);
exports.AnnalImportController = AnnalImportController = __decorate([
    (0, swagger_1.ApiTags)('Courses - Annal import'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('annals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [annal_import_service_1.AnnalImportService])
], AnnalImportController);
//# sourceMappingURL=annal-import.controller.js.map