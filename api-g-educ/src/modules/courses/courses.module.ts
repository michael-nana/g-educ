
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AuditModule } from '../audit/audit.module';
import { AcademicsModule } from '../academics/academics.module';
import { GamificationModule } from '../gamification/gamification.module';
import { AssessmentsModule } from '../assessments/assessments.module';

import { UploadModule } from '../../common/upload/upload.module';

import { LessonsController } from './controllers/lessons.controller';
import { AnnalImportController } from './controllers/annal-import.controller';
import { LessonsService } from './services/lessons.service';
import { AnnalImportService } from './services/annal-import.service';

@Module({
  imports: [
    AuthModule,
    AuditModule,
    AcademicsModule,
    GamificationModule,
    AssessmentsModule,
    UploadModule,
  ],
  controllers: [
    LessonsController,
    AnnalImportController,
  ],
  providers: [
    LessonsService,
    AnnalImportService,
  ],
  exports: [
    LessonsService,
  ],
})
export class CoursesModule {}
