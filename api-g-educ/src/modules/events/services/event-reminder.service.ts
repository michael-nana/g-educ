
import {
  Injectable,
  Logger,
} from '@nestjs/common';

import {
  Cron,
  CronExpression,
} from '@nestjs/schedule';

import {
  ContentStatus,
  ReminderStatus,
  NotificationType,
} from '../../../generated/prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationsService } from '../../notifications/services/notifications.service';

@Injectable()
export class EventReminderService {
  private readonly logger = new Logger(EventReminderService.name);

  private readonly maxAttempts = 3;

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE, {
    timeZone: 'Africa/Ouagadougou',
  })
  async sendReminders() {
      this.logger.log('Déclenchement du worker des rappels.');

    try {
      await this.prisma.$transaction(
        async (tx) => {
          const reminders = await tx.$queryRaw<
  Array<{
    id: string;
    classId: string;
    title: string;
    eventId: string;
  }>
>`
  SELECT
    reminder."id",
    event."id" AS "eventId",
    event."classId",
    event."title"
  FROM "event_reminders" AS reminder
  INNER JOIN "events" AS event
    ON event."id" = reminder."eventId"
  WHERE
    reminder."status" = 'PLANIFIE'
    AND reminder."remindAt" <= NOW()
    AND event."status" = 'PUBLIE'
  ORDER BY reminder."remindAt" ASC
  LIMIT 50
  FOR UPDATE OF reminder SKIP LOCKED
`;
  this.logger.log(
  `${reminders.length} rappel(s) à traiter.`,
);
          for (const reminder of reminders) {
            try {
              await this.notificationsService.notifyClass(
                reminder.classId,
                
                {
                  type: NotificationType.EVENEMENT_RAPPEL,
                  title: 'Rappel d’événement',
                  body: reminder.title,
                  data: {
                    eventId: reminder.eventId,
                  },
                },
              );

              await tx.eventReminder.update({
                where: { id: reminder.id },
                data: {
                  status: ReminderStatus.ENVOYE,
                  sentAt: new Date(),
                },
              });

              this.logger.log(
                `Rappel ${reminder.id} traité avec succès.`,
              );
            } catch (error) {
              const nextAttempts = 1;

              // La ligne est verrouillée : nous pouvons lire sa valeur
              // actuelle dans la transaction.
              const current = await tx.eventReminder.findUnique({
                where: { id: reminder.id },
                select: { attempts: true },
              });

              const attempts =
                (current?.attempts ?? 0) + nextAttempts;

              await tx.eventReminder.update({
                where: { id: reminder.id },
                data: {
                  attempts: {
                    increment: nextAttempts,
                  },
                  ...(attempts >= this.maxAttempts
                    ? { status: ReminderStatus.ECHEC }
                    : {}),
                },
              });

              this.logger.error(
                `Échec du rappel ${reminder.id} (tentative ${attempts}/${this.maxAttempts}).`,
                error instanceof Error
                  ? error.stack
                  : String(error),
              );
            }
          }
        },
        {
          maxWait: 10000,
          timeout: 60000,
        },
      );
    } catch (error) {
      this.logger.error(
        'Erreur pendant le traitement des rappels d’événements.',
        error instanceof Error
          ? error.stack
          : String(error),
      );
    }
  }

  
}
