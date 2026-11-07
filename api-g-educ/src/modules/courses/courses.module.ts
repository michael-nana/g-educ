
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AuditModule } from '../audit/audit.module';
import { AcademicsModule } from '../academics/academics.module';
import { GamificationModule } from '../gamification/gamification.module';

import { UploadModule } from '../../common/upload/upload.module';

import { LessonsController } from './controllers/lessons.controller';
import { LessonsService } from './services/lessons.service';

@Module({
  imports: [
    AuthModule,
    AuditModule,
    AcademicsModule,
    GamificationModule,
    UploadModule,
  ],
  controllers: [
    LessonsController,
  ],
  providers: [
    LessonsService,
  ],
  exports: [
    LessonsService,
  ],
})
export class CoursesModule {}
