"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const me_controller_1 = require("./controllers/me.controller");
const users_controller_1 = require("./controllers/users.controller");
const class_change_requests_controller_1 = require("./controllers/class-change-requests.controller");
const users_service_1 = require("./services/users.service");
const staff_service_1 = require("./services/staff.service");
const class_change_requests_service_1 = require("./services/class-change-requests.service");
const anonymization_service_1 = require("./services/anonymization.service");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [
            me_controller_1.MeController,
            users_controller_1.UsersController,
            class_change_requests_controller_1.ClassChangeRequestsController,
        ],
        providers: [
            users_service_1.UsersService,
            staff_service_1.StaffService,
            class_change_requests_service_1.ClassChangeRequestsService,
            anonymization_service_1.AnonymizationService,
        ],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map