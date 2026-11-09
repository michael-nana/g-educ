
import { Module } from '@nestjs/common';

import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';
import { EventReminderService } from './services/event-reminder.service';

import { AuthModule } from '../auth/auth.module';
import { AuditModule } from '../audit/audit.module';
import { AcademicsModule } from '../academics/academics.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    AuthModule,
    AuditModule,
    AcademicsModule,
    NotificationsModule,
  ],
  controllers: [
    EventsController,
  ],
  providers: [
    EventsService,
    EventReminderService,
  ],
  exports: [
    EventsService,
  ],
})
export class EventsModule {}
