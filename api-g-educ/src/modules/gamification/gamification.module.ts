
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

import {
  ActivitiesController,
  MeGamificationController,
} from './controllers/gamification.controller';

import { GamificationService } from './services/gamification.service';

@Module({
  imports: [AuthModule],
  controllers: [
    MeGamificationController,
    ActivitiesController,
  ],
  providers: [GamificationService],
  exports: [GamificationService],
})
export class GamificationModule {}
