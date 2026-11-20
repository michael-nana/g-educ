
import { Module } from '@nestjs/common';

import { AssessmentsController } from './controllers/assessments.controller';
import { AssessmentsService } from './services/assessments.service';

import { AuthModule } from '../auth/auth.module';
import { AuditModule } from '../audit/audit.module';
import { AcademicsModule } from '../academics/academics.module';
import { GamificationModule } from '../gamification/gamification.module';
import { UploadModule } from '../../common/upload/upload.module';

@Module({
  imports: [
    AuthModule,
    AuditModule,
    AcademicsModule,
    GamificationModule,
    UploadModule,
  ],
  controllers: [
    AssessmentsController,
  ],
  providers: [
    AssessmentsService,
  ],
  exports: [
    AssessmentsService,
  ],
})
export class AssessmentsModule {}
