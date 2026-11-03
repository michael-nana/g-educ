import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AuditModule } from '../audit/audit.module';

import { AcademicYearsController } from './controllers/academic-years.controller';
import { ClassesController } from './controllers/classes.controller';
import { SubjectsController } from './controllers/subjects.controller';
import { ClassSubjectsController } from './controllers/class-subjects.controller';
import { MeSubjectsController } from './controllers/me-subjects.controller';
import { ChaptersController } from './controllers/chapters.controller';

import { AcademicYearsService } from './services/academic-years.service';
import { ClassesService } from './services/classes.service';
import { SubjectsService } from './services/subjects.service';
import { ClassSubjectsService } from './services/class-subjects.service';
import { MeSubjectsService } from './services/me-subjects.service';
import { TeacherScopeService } from './services/teacher-scope.service';
import { ChaptersService } from './services/chapters.service';

@Module({
  imports: [
    AuthModule,
    AuditModule,
  ],
  controllers: [
    AcademicYearsController,
    ClassesController,
    SubjectsController,
    ClassSubjectsController,
    MeSubjectsController,
    ChaptersController,
  ],
  providers: [
    AcademicYearsService,
    ClassesService,
    SubjectsService,
    ClassSubjectsService,
    MeSubjectsService,
    TeacherScopeService,
    ChaptersService,
  ],
  exports: [
    AcademicYearsService,
    ClassesService,
    SubjectsService,
    ClassSubjectsService,
    MeSubjectsService,
    TeacherScopeService,
    ChaptersService,
  ],
})
export class AcademicsModule {}