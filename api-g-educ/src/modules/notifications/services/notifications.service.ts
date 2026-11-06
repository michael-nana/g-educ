import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  NotificationType,
  Prisma,
  Role,
  UserStatus,
} from '../../../generated/prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { PushService } from '../../../common/push/push.service';

import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import type { NotificationPayload } from '../interfaces/notification-payload.interface';
import type { ListNotificationsDto } from '../dto/list-notifications.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly pushService: PushService,
  ) {}

  private isEnabled(
    type: NotificationType,
    preference: {
      eventsEnabled: boolean;
      streakReminder: boolean;
      forumEnabled: boolean;
    } | null,
  ): boolean {
    if (!preference) {
      return true;
    }

    switch (type) {
      case NotificationType.EVENEMENT_ANNONCE:
      case NotificationType.EVENEMENT_RAPPEL:
        return preference.eventsEnabled;

      case NotificationType.FLAMME_RAPPEL:
        return preference.streakReminder;

      case NotificationType.FORUM_REPONSE:
        return preference.forumEnabled;

      case NotificationType.CONTRIBUTION_DECISION:
      case NotificationType.SANCTION:
      case NotificationType.SYSTEME:
        return true;

      default:
        return true;
    }
  }

  async notifyUsers(
    userIds: string[],
    payload: NotificationPayload,
  ) {
    const uniqueIds = [...new Set(userIds)];

    if (uniqueIds.length === 0) {
      return {
        created: 0,
        pushSent: 0,
      };
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: { in: uniqueIds },
        anonymizedAt: null,
      },
      select: {
        id: true,
        notificationPreference: {
          select: {
            eventsEnabled: true,
            streakReminder: true,
            forumEnabled: true,
          },
        },
        deviceTokens: {
          select: {
            token: true,
          },
        },
      },
    });

    const eligibleUsers = users.filter((user) =>
      this.isEnabled(payload.type, user.notificationPreference),
    );

    if (eligibleUsers.length === 0) {
      return {
        created: 0,
        pushSent: 0,
      };
    }

    const notifications = await Promise.all(
      eligibleUsers.map((user) =>
        this.prisma.notification.create({
          data: {
            userId: user.id,
            type: payload.type,
            title: payload.title,
            body: payload.body,
            ...(payload.data !== undefined && {
              data: payload.data as Prisma.InputJsonValue,
            }),
          },
          select: {
            id: true,
            userId: true,
          },
        }),
      ),
    );

    const tokenOwners = new Map<string, string>();

    for (const user of eligibleUsers) {
      for (const device of user.deviceTokens) {
        tokenOwners.set(device.token, user.id);
      }
    }

    const tokens = [...tokenOwners.keys()];

    if (tokens.length === 0) {
      return {
        created: notifications.length,
        pushSent: 0,
      };
    }

    let pushResult;

    try {
      pushResult = await this.pushService.sendToTokens(tokens, {
        title: payload.title,
        body: payload.body,
        data: this.toPushData(payload.data),
      });
    } catch (error) {
      this.logger.error(
        'Erreur pendant l’envoi des notifications Push.',
        error instanceof Error ? error.stack : String(error),
      );

      return {
        created: notifications.length,
        pushSent: 0,
      };
    }

    if (pushResult.invalidTokens.length > 0) {
      await this.prisma.deviceToken.deleteMany({
        where: {
          token: {
            in: pushResult.invalidTokens,
          },
        },
      });
    }

    const successfulUserIds = new Set(
      pushResult.successTokens
        .map((token) => tokenOwners.get(token))
        .filter((id): id is string => Boolean(id)),
    );

    const successfulNotificationIds = notifications
      .filter((notification) =>
        successfulUserIds.has(notification.userId),
      )
      .map((notification) => notification.id);

    if (successfulNotificationIds.length > 0) {
      await this.prisma.notification.updateMany({
        where: {
          id: {
            in: successfulNotificationIds,
          },
        },
        data: {
          sentAt: new Date(),
        },
      });
    }

    return {
      created: notifications.length,
      pushSent: successfulUserIds.size,
    };
  }

  
  async notifyStreakReminders(today: Date, currentTime: string) {
    // Le verrou est conservé jusqu'à la fin de la transaction.
    // Il empêche deux instances du cron de traiter les rappels simultanément.
    const prepared = await this.prisma.$transaction(async (tx) => {
      const lock = await tx.$queryRaw<Array<{ locked: boolean }>>`
        SELECT pg_try_advisory_xact_lock(741852, 1) AS locked
      `;

      if (!lock[0]?.locked) {
        return null;
      }

      const students = await tx.user.findMany({
        where: {
          role: Role.ELEVE,
          status: UserStatus.ACTIF,
          anonymizedAt: null,
        },
        select: {
          id: true,
          streak: {
            select: {
              currentStreak: true,
              lastActiveDate: true,
            },
          },
          notificationPreference: {
            select: {
              streakReminder: true,
              streakReminderTime: true,
            },
          },
          deviceTokens: {
            select: {
              token: true,
            },
          },
        },
      });

      const eligibleStudents = students.filter((student) => {
        const streak = student.streak;
        const preference = student.notificationPreference;

        if (!streak || streak.currentStreak <= 0) {
          return false;
        }

        if (
          !streak.lastActiveDate ||
          streak.lastActiveDate.getTime() >= today.getTime()
        ) {
          return false;
        }

        if (preference?.streakReminder === false) {
          return false;
        }

        const reminderTime =
          preference?.streakReminderTime ?? '18:00';

        return reminderTime === currentTime;
      });

      if (eligibleStudents.length === 0) {
        return {
          notifications: [],
          tokenOwners: [] as Array<[string, string]>,
        };
      }

      const userIds = eligibleStudents.map((student) => student.id);

      // Vérification effectuée dans la même transaction que la création.
      const alreadyNotified = await tx.notification.findMany({
        where: {
          userId: { in: userIds },
          type: NotificationType.FLAMME_RAPPEL,
          createdAt: {
            gte: today,
          },
        },
        select: {
          userId: true,
        },
      });

      const notifiedIds = new Set(
        alreadyNotified.map((notification) => notification.userId),
      );

      const recipients = eligibleStudents.filter(
        (student) => !notifiedIds.has(student.id),
      );

      if (recipients.length === 0) {
        return {
          notifications: [],
          tokenOwners: [] as Array<[string, string]>,
        };
      }

      const notifications: Array<{ id: string; userId: string }> = [];

      for (const student of recipients) {
        const notification = await tx.notification.create({
          data: {
            userId: student.id,
            type: NotificationType.FLAMME_RAPPEL,
            title: 'N’oublie pas ta flamme !',
            body: 'Fais une activité aujourd’hui pour préserver ta série.',
            data: {
              screen: 'gamification',
              type: 'streak-reminder',
            } satisfies Prisma.InputJsonValue,
          },
          select: {
            id: true,
            userId: true,
          },
        });

        notifications.push(notification);
      }

      const tokenOwners = new Map<string, string>();

      for (const student of recipients) {
        for (const device of student.deviceTokens) {
          tokenOwners.set(device.token, student.id);
        }
      }

      return {
        notifications,
        tokenOwners: [...tokenOwners.entries()],
      };
    });

    // Une autre exécution du cron détient déjà le verrou.
    if (prepared === null) {
      return {
        created: 0,
        pushSent: 0,
        skipped: true,
      };
    }

    const { notifications, tokenOwners } = prepared;

    if (notifications.length === 0) {
      return {
        created: 0,
        pushSent: 0,
        skipped: false,
      };
    }

    const ownerByToken = new Map(tokenOwners);
    const tokens = [...ownerByToken.keys()];

    if (tokens.length === 0) {
      return {
        created: notifications.length,
        pushSent: 0,
        skipped: false,
      };
    }

    try {
      const pushResult = await this.pushService.sendToTokens(tokens, {
        title: 'N’oublie pas ta flamme !',
        body: 'Fais une activité aujourd’hui pour préserver ta série.',
        data: {
          screen: 'gamification',
          type: 'streak-reminder',
        },
      });

      if (pushResult.invalidTokens.length > 0) {
        await this.prisma.deviceToken.deleteMany({
          where: {
            token: {
              in: pushResult.invalidTokens,
            },
          },
        });
      }

      const successfulUserIds = new Set(
        pushResult.successTokens
          .map((token) => ownerByToken.get(token))
          .filter((id): id is string => Boolean(id)),
      );

      const successfulNotificationIds = notifications
        .filter((notification) =>
          successfulUserIds.has(notification.userId),
        )
        .map((notification) => notification.id);

      if (successfulNotificationIds.length > 0) {
        await this.prisma.notification.updateMany({
          where: {
            id: {
              in: successfulNotificationIds,
            },
          },
          data: {
            sentAt: new Date(),
          },
        });
      }

      return {
        created: notifications.length,
        pushSent: successfulUserIds.size,
        skipped: false,
      };
    } catch (error) {
      this.logger.error(
        'Erreur pendant l’envoi des rappels Push.',
        error instanceof Error ? error.stack : String(error),
      );

      return {
        created: notifications.length,
        pushSent: 0,
        skipped: false,
      };
    }
  }


  async notifyClass(
    classId: string,
    payload: NotificationPayload,
  ) {
    const students = await this.prisma.user.findMany({
      where: {
        role: Role.ELEVE,
        status: UserStatus.ACTIF,
        anonymizedAt: null,
        studentProfile: {
          is: {
            classId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return this.notifyUsers(
      students.map((student) => student.id),
      payload,
    );
  }

  async list(
    user: AuthenticatedUser,
    dto: ListNotificationsDto,
  ) {
    const page = Math.max(1, Number(dto.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(dto.limit ?? 20)));

    const where = {
      userId: user.id,
      ...(dto.unread === true && {
        readAt: null,
      }),
    };

    const [items, total, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          type: true,
          title: true,
          body: true,
          data: true,
          sentAt: true,
          readAt: true,
          createdAt: true,
        },
      }),

      this.prisma.notification.count({ where }),

      this.prisma.notification.count({
        where: {
          userId: user.id,
          readAt: null,
        },
      }),
    ]);

    return {
      data: items,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(
    user: AuthenticatedUser,
    notificationId: string,
  ) {
    const result = await this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId: user.id,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });

    if (result.count === 0) {
      const notification = await this.prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

if (!notification) {
  throw new NotFoundException('Notification introuvable.');
}

      return {
        message: 'Cette notification est déjà lue.',
        updated: false,
      };
    }

    return {
      message: 'Notification marquée comme lue.',
      updated: true,
    };
  }

  async markAllAsRead(user: AuthenticatedUser) {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId: user.id,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });

    return {
      message: 'Notifications marquées comme lues.',
      updatedCount: result.count,
    };
  }

private toPushData(
  data?: Record<string, unknown>,
): Record<string, string> {
  if (!data) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === 'string'
        ? value
        : JSON.stringify(value) ?? String(value),
    ]),
  );
}
}