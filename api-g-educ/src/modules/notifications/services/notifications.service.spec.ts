import { NotificationsService } from './notifications.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { PushService } from '../../../common/push/push.service';
import { NotificationType } from '../../../generated/prisma/client';

describe('NotificationsService', () => {
  let service: NotificationsService;

  const prismaMock = {
    user: {
      findMany: jest.fn(),
    },
    notification: {
      create: jest.fn(),
      updateMany: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    deviceToken: {
      deleteMany: jest.fn(),
    },
  };

  const pushMock = {
    sendToTokens: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new NotificationsService(
      prismaMock as unknown as PrismaService,
      pushMock as unknown as PushService,
    );
  });

  it('crée une notification et envoie le Push', async () => {
    prismaMock.user.findMany.mockResolvedValue([
      {
        id: 'user-1',
        notificationPreference: null,
        deviceTokens: [{ token: 'valid-token-123456789012345' }],
      },
    ]);

    prismaMock.notification.create.mockResolvedValue({
      id: 'notification-1',
      userId: 'user-1',
    });

    pushMock.sendToTokens.mockResolvedValue({
      successTokens: ['valid-token-123456789012345'],
      invalidTokens: [],
    });

    prismaMock.notification.updateMany.mockResolvedValue({ count: 1 });

    const result = await service.notifyUsers(
      ['user-1'],
      {
        type: NotificationType.SYSTEME,
        title: 'Test',
        body: 'Notification de test',
      },
    );

    expect(result).toEqual({
      created: 1,
      pushSent: 1,
    });

    expect(prismaMock.notification.create).toHaveBeenCalledTimes(1);
    expect(pushMock.sendToTokens).toHaveBeenCalledTimes(1);
    expect(prismaMock.notification.updateMany).toHaveBeenCalledTimes(1);
  });

  it('respecte la préférence de désactivation des événements', async () => {
    prismaMock.user.findMany.mockResolvedValue([
      {
        id: 'user-2',
        notificationPreference: {
          eventsEnabled: false,
          streakReminder: true,
          forumEnabled: true,
        },
        deviceTokens: [{ token: 'valid-token-123456789012345' }],
      },
    ]);

    const result = await service.notifyUsers(
      ['user-2'],
      {
        type: NotificationType.EVENEMENT_ANNONCE,
        title: 'Événement',
        body: 'Nouvel événement',
      },
    );

    expect(result).toEqual({
      created: 0,
      pushSent: 0,
    });

    expect(prismaMock.notification.create).not.toHaveBeenCalled();
    expect(pushMock.sendToTokens).not.toHaveBeenCalled();
  });

  it('supprime les tokens invalides', async () => {
    const invalidToken = 'invalid-token-123456789012345';

    prismaMock.user.findMany.mockResolvedValue([
      {
        id: 'user-3',
        notificationPreference: null,
        deviceTokens: [{ token: invalidToken }],
      },
    ]);

    prismaMock.notification.create.mockResolvedValue({
      id: 'notification-3',
      userId: 'user-3',
    });

    pushMock.sendToTokens.mockResolvedValue({
      successTokens: [],
      invalidTokens: [invalidToken],
    });

    prismaMock.deviceToken.deleteMany.mockResolvedValue({ count: 1 });

    const result = await service.notifyUsers(
      ['user-3'],
      {
        type: NotificationType.SYSTEME,
        title: 'Test',
        body: 'Test token invalide',
      },
    );

    expect(result.created).toBe(1);
    expect(result.pushSent).toBe(0);

    expect(prismaMock.deviceToken.deleteMany).toHaveBeenCalledWith({
      where: {
        token: {
          in: [invalidToken],
        },
      },
    });

    expect(prismaMock.notification.updateMany).not.toHaveBeenCalled();
  });

  it('ne tente aucun envoi lorsque l’utilisateur ne possède aucun appareil', async () => {
    prismaMock.user.findMany.mockResolvedValue([
      {
        id: 'user-4',
        notificationPreference: null,
        deviceTokens: [],
      },
    ]);

    prismaMock.notification.create.mockResolvedValue({
      id: 'notification-4',
      userId: 'user-4',
    });

    const result = await service.notifyUsers(
      ['user-4'],
      {
        type: NotificationType.SYSTEME,
        title: 'Test',
        body: 'Sans appareil',
      },
    );

    expect(result).toEqual({
      created: 1,
      pushSent: 0,
    });

    expect(pushMock.sendToTokens).not.toHaveBeenCalled();
  });

  it('marque une notification appartenant à l’utilisateur comme lue', async () => {
    prismaMock.notification.updateMany.mockResolvedValue({ count: 1 });

    const result = await service.markAsRead(
      { id: 'user-5' } as any,
      'notification-5',
    );

    expect(result.updated).toBe(true);

    expect(prismaMock.notification.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: 'notification-5',
          userId: 'user-5',
          readAt: null,
        },
      }),
    );
  });
});