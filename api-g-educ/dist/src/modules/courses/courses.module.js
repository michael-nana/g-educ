"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const audit_module_1 = require("../audit/audit.module");
const academics_module_1 = require("../academics/academics.module");
const gamification_module_1 = require("../gamification/gamification.module");
const upload_module_1 = require("../../common/upload/upload.module");
const lessons_controller_1 = require("./controllers/lessons.controller");
const lessons_service_1 = require("./services/lessons.service");
let CoursesModule = class CoursesModule {
};
exports.CoursesModule = CoursesModule;
exports.CoursesModule = CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            audit_module_1.AuditModule,
            academics_module_1.AcademicsModule,
            gamification_module_1.GamificationModule,
            upload_module_1.UploadModule,
        ],
        controllers: [
            lessons_controller_1.LessonsController,
        ],
        providers: [
            lessons_service_1.LessonsService,
        ],
        exports: [
            lessons_service_1.LessonsService,
        ],
    })
], CoursesModule);
//# sourceMappingURL=courses.module.js.map