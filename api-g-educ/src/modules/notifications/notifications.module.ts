import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PushModule } from '../../common/push/push.module';

import { DevicesController } from './controllers/devices.controller';
import { NotificationPreferencesController } from './controllers/notification-preferences.controller';
import { MyNotificationsController } from './controllers/my-notifications.controller';
import { AnnouncementsController } from './controllers/announcements.controller';

import { DevicesService } from './services/devices.service';
import { NotificationPreferencesService } from './services/notification-preferences.service';
import { NotificationsService } from './services/notifications.service';
import { AnnouncementsService } from './services/announcements.service';
import { StreakReminderService } from './services/streak-reminder.service';

@Module({
  imports: [
    AuthModule,
    PushModule,
  ],
  controllers: [
    DevicesController,
    NotificationPreferencesController,
    MyNotificationsController,
    AnnouncementsController,
  ],
  providers: [
    DevicesService,
    NotificationPreferencesService,
    NotificationsService,
    AnnouncementsService,
    StreakReminderService,
  ],
  exports: [
    NotificationsService,
  ],
})
export class NotificationsModule {}