import { NotificationPreferencesService } from './notification-preferences.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('NotificationPreferencesService', () => {
  let service: NotificationPreferencesService;

  const prismaMock = {
    notificationPreference: {
      upsert: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new NotificationPreferencesService(
      prismaMock as unknown as PrismaService,
    );
  });

  it('crée les préférences par défaut si elles sont absentes', async () => {
    prismaMock.notificationPreference.upsert.mockResolvedValue({
      eventsEnabled: true,
      streakReminder: true,
      streakReminderTime: '18:00',
      forumEnabled: true,
    });

    const result = await service.get({ id: 'user-1' } as any);

    expect(result.streakReminderTime).toBe('18:00');

    expect(prismaMock.notificationPreference.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId: 'user-1' },
        create: { userId: 'user-1' },
        update: {},
      }),
    );
  });

  it('met à jour les préférences sans remplacer les autres valeurs', async () => {
    prismaMock.notificationPreference.upsert.mockResolvedValue({
      eventsEnabled: false,
      streakReminder: true,
      streakReminderTime: '18:00',
      forumEnabled: true,
    });

    await service.update(
      { id: 'user-1' } as any,
      { eventsEnabled: false },
    );

    expect(prismaMock.notificationPreference.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId: 'user-1' },
        update: { eventsEnabled: false },
      }),
    );
  });
});