import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { StudySessionsController } from './controllers/study-sessions.controller';
import { StudySessionsService } from './services/study-sessions.service';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [
    StudySessionsController,
  ],
  providers: [
    StudySessionsService,
  ],
  exports: [
    StudySessionsService,
  ],
})
export class PlannerModule {}