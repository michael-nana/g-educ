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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("../../../generated/prisma/client");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const users_service_1 = require("../services/users.service");
const staff_service_1 = require("../services/staff.service");
const create_staff_dto_1 = require("../dto/create-staff.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const list_users_dto_1 = require("../dto/list-users.dto");
let UsersController = class UsersController {
    usersService;
    staffService;
    constructor(usersService, staffService) {
        this.usersService = usersService;
        this.staffService = staffService;
    }
    createStaff(dto) {
        return this.staffService.create(dto);
    }
    list(dto) {
        return this.usersService.list(dto);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(admin, id, dto) {
        return this.usersService.updateUser(admin, id, dto);
    }
    suspend(admin, id) {
        return this.usersService.suspend(admin, id);
    }
    reactivate(admin, id) {
        return this.usersService.reactivate(admin, id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('staff'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un enseignant ou un modérateur' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.CreateStaffDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createStaff", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les utilisateurs' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_users_dto_1.ListUsersDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Consulter un utilisateur' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier le rôle ou les permissions' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/suspend'),
    (0, swagger_1.ApiOperation)({ summary: 'Suspendre un utilisateur' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "suspend", null);
__decorate([
    (0, common_1.Post)(':id/reactivate'),
    (0, swagger_1.ApiOperation)({ summary: 'Réactiver un utilisateur' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "reactivate", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users - Administration'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMINISTRATEUR),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        staff_service_1.StaffService])
], UsersController);
//# sourceMappingURL=users.controller.js.map