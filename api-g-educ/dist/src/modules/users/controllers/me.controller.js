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
exports.MeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const users_service_1 = require("../services/users.service");
const anonymization_service_1 = require("../services/anonymization.service");
const class_change_requests_service_1 = require("../services/class-change-requests.service");
const update_my_profile_dto_1 = require("../dto/update-my-profile.dto");
const change_my_password_dto_1 = require("../dto/change-my-password.dto");
const create_class_change_request_dto_1 = require("../dto/create-class-change-request.dto");
let MeController = class MeController {
    usersService;
    anonymizationService;
    classChangeRequestsService;
    constructor(usersService, anonymizationService, classChangeRequestsService) {
        this.usersService = usersService;
        this.anonymizationService = anonymizationService;
        this.classChangeRequestsService = classChangeRequestsService;
    }
    getMe(user) {
        return this.usersService.getMe(user);
    }
    updateProfile(user, dto) {
        return this.usersService.updateMyProfile(user, dto);
    }
    changePassword(user, dto) {
        return this.usersService.changePassword(user, dto);
    }
    createClassChangeRequest(user, dto) {
        return this.classChangeRequestsService.create(user, dto);
    }
    anonymize(user) {
        return this.anonymizationService.anonymize(user);
    }
};
exports.MeController = MeController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Consulter mon profil' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MeController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, roles_decorator_1.Roles)(client_1.Role.ELEVE),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier mon profil élève' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_my_profile_dto_1.UpdateMyProfileDto]),
    __metadata("design:returntype", void 0)
], MeController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('password'),
    (0, swagger_1.ApiOperation)({ summary: 'Changer mon mot de passe' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_my_password_dto_1.ChangeMyPasswordDto]),
    __metadata("design:returntype", void 0)
], MeController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('class-change-requests'),
    (0, roles_decorator_1.Roles)(client_1.Role.ELEVE),
    (0, swagger_1.ApiOperation)({ summary: 'Demander un changement de classe' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_class_change_request_dto_1.CreateClassChangeRequestDto]),
    __metadata("design:returntype", void 0)
], MeController.prototype, "createClassChangeRequest", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Anonymiser mon compte' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MeController.prototype, "anonymize", null);
exports.MeController = MeController = __decorate([
    (0, swagger_1.ApiTags)('Users - Mon compte'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('me'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        anonymization_service_1.AnonymizationService,
        class_change_requests_service_1.ClassChangeRequestsService])
], MeController);
//# sourceMappingURL=me.controller.js.map