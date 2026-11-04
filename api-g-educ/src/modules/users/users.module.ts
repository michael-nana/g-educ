import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

import { MeController } from './controllers/me.controller';
import { UsersController } from './controllers/users.controller';
import { ClassChangeRequestsController } from './controllers/class-change-requests.controller';

import { UsersService } from './services/users.service';
import { StaffService } from './services/staff.service';
import { ClassChangeRequestsService } from './services/class-change-requests.service';
import { AnonymizationService } from './services/anonymization.service';

@Module({
  imports: [AuthModule],
  controllers: [
    MeController,
    UsersController,
    ClassChangeRequestsController,
  ],
  providers: [
    UsersService,
    StaffService,
    ClassChangeRequestsService,
    AnonymizationService,
  ],
  exports: [UsersService],
})
export class UsersModule {}