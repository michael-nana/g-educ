
import { StreakReminderService } from './streak-reminder.service';
import { NotificationsService } from './notifications.service';

describe('StreakReminderService', () => {
  let service: StreakReminderService;

  const notificationsMock = {
    notifyStreakReminders: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new StreakReminderService(
      notificationsMock as unknown as NotificationsService,
    );
  });

  it('déclenche le traitement des rappels', async () => {
    notificationsMock.notifyStreakReminders.mockResolvedValue({
      created: 1,
      pushSent: 1,
      skipped: false,
    });

    await service.sendReminders();

    expect(
      notificationsMock.notifyStreakReminders,
    ).toHaveBeenCalledTimes(1);

    expect(
      notificationsMock.notifyStreakReminders,
    ).toHaveBeenCalledWith(
      expect.any(Date),
      expect.stringMatching(/^\d{2}:\d{2}$/),
    );
  });

  it('ne signale pas de rappel lorsqu’une autre exécution détient le verrou', async () => {
    notificationsMock.notifyStreakReminders.mockResolvedValue({
      created: 0,
      pushSent: 0,
      skipped: true,
    });

    await expect(service.sendReminders()).resolves.toBeUndefined();

    expect(
      notificationsMock.notifyStreakReminders,
    ).toHaveBeenCalledTimes(1);
  });

  it('capture les erreurs du traitement sans faire échouer le cron', async () => {
    notificationsMock.notifyStreakReminders.mockRejectedValue(
      new Error('Erreur PostgreSQL'),
    );

    await expect(service.sendReminders()).resolves.toBeUndefined();
  });
});
