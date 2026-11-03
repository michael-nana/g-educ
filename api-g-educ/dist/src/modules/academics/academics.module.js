"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicsModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const audit_module_1 = require("../audit/audit.module");
const academic_years_controller_1 = require("./controllers/academic-years.controller");
const classes_controller_1 = require("./controllers/classes.controller");
const subjects_controller_1 = require("./controllers/subjects.controller");
const class_subjects_controller_1 = require("./controllers/class-subjects.controller");
const me_subjects_controller_1 = require("./controllers/me-subjects.controller");
const chapters_controller_1 = require("./controllers/chapters.controller");
const academic_years_service_1 = require("./services/academic-years.service");
const classes_service_1 = require("./services/classes.service");
const subjects_service_1 = require("./services/subjects.service");
const class_subjects_service_1 = require("./services/class-subjects.service");
const me_subjects_service_1 = require("./services/me-subjects.service");
const teacher_scope_service_1 = require("./services/teacher-scope.service");
const chapters_service_1 = require("./services/chapters.service");
let AcademicsModule = class AcademicsModule {
};
exports.AcademicsModule = AcademicsModule;
exports.AcademicsModule = AcademicsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            audit_module_1.AuditModule,
        ],
        controllers: [
            academic_years_controller_1.AcademicYearsController,
            classes_controller_1.ClassesController,
            subjects_controller_1.SubjectsController,
            class_subjects_controller_1.ClassSubjectsController,
            me_subjects_controller_1.MeSubjectsController,
            chapters_controller_1.ChaptersController,
        ],
        providers: [
            academic_years_service_1.AcademicYearsService,
            classes_service_1.ClassesService,
            subjects_service_1.SubjectsService,
            class_subjects_service_1.ClassSubjectsService,
            me_subjects_service_1.MeSubjectsService,
            teacher_scope_service_1.TeacherScopeService,
            chapters_service_1.ChaptersService,
        ],
        exports: [
            academic_years_service_1.AcademicYearsService,
            classes_service_1.ClassesService,
            subjects_service_1.SubjectsService,
            class_subjects_service_1.ClassSubjectsService,
            me_subjects_service_1.MeSubjectsService,
            teacher_scope_service_1.TeacherScopeService,
            chapters_service_1.ChaptersService,
        ],
    })
], AcademicsModule);
//# sourceMappingURL=academics.module.js.map