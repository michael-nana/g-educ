
import {
  Injectable,
  Logger,
} from '@nestjs/common';

import {
  Cron,
  CronExpression,
} from '@nestjs/schedule';

import { NotificationsService } from './notifications.service';

@Injectable()
export class StreakReminderService {
  private readonly logger = new Logger(StreakReminderService.name);

  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE, {
    timeZone: 'Africa/Ouagadougou',
  })
  async sendReminders() {
    try {
      const now = new Date();

      // Le Burkina Faso est en UTC+0.
      const today = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
        ),
      );

      const currentTime = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Africa/Ouagadougou',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).format(now);

      const result =
        await this.notificationsService.notifyStreakReminders(
          today,
          currentTime,
        );

      if (result.skipped) {
        return;
      }

      if (result.created > 0) {
        this.logger.log(
          `${result.created} rappel(s) de flamme créé(s). ${result.pushSent} envoi(s) Push réussi(s).`,
        );
      }
    } catch (error) {
      this.logger.error(
        'Erreur pendant le traitement des rappels de flamme.',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }
}
