import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import type { UpdateNotificationPreferencesDto } from '../dto/update-notification-preferences.dto';

@Injectable()
export class NotificationPreferencesService {
  constructor(private readonly prisma: PrismaService) {}

  async get(user: AuthenticatedUser) {
    return this.prisma.notificationPreference.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
      },
      update: {},
      select: {
        eventsEnabled: true,
        streakReminder: true,
        streakReminderTime: true,
        forumEnabled: true,
        updatedAt: true,
      },
    });
  }

  async update(
    user: AuthenticatedUser,
    dto: UpdateNotificationPreferencesDto,
  ) {
    return this.prisma.notificationPreference.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        ...dto,
      },
      update: {
        ...dto,
      },
      select: {
        eventsEnabled: true,
        streakReminder: true,
        streakReminderTime: true,
        forumEnabled: true,
        updatedAt: true,
      },
    });
  }
}