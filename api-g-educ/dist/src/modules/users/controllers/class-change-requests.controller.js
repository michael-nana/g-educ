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
exports.ClassChangeRequestsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("../../../generated/prisma/client");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const class_change_requests_service_1 = require("../services/class-change-requests.service");
const review_class_change_request_dto_1 = require("../dto/review-class-change-request.dto");
let ClassChangeRequestsController = class ClassChangeRequestsController {
    service;
    constructor(service) {
        this.service = service;
    }
    list() {
        return this.service.list();
    }
    approve(admin, id, dto) {
        return this.service.approve(admin, id, dto);
    }
    reject(admin, id, dto) {
        return this.service.reject(admin, id, dto);
    }
};
exports.ClassChangeRequestsController = ClassChangeRequestsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les demandes de changement de classe' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassChangeRequestsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approuver une demande' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, review_class_change_request_dto_1.ReviewClassChangeRequestDto]),
    __metadata("design:returntype", void 0)
], ClassChangeRequestsController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Refuser une demande' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, review_class_change_request_dto_1.ReviewClassChangeRequestDto]),
    __metadata("design:returntype", void 0)
], ClassChangeRequestsController.prototype, "reject", null);
exports.ClassChangeRequestsController = ClassChangeRequestsController = __decorate([
    (0, swagger_1.ApiTags)('Users - Changements de classe'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMINISTRATEUR),
    (0, common_1.Controller)('class-change-requests'),
    __metadata("design:paramtypes", [class_change_requests_service_1.ClassChangeRequestsService])
], ClassChangeRequestsController);
//# sourceMappingURL=class-change-requests.controller.js.map