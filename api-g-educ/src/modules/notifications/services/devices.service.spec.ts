import { DevicesService } from './devices.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { DevicePlatform } from '../../../generated/prisma/client';

describe('DevicesService', () => {
  let service: DevicesService;

  const prismaMock = {
    deviceToken: {
      upsert: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new DevicesService(
      prismaMock as unknown as PrismaService,
    );
  });

  it('enregistre ou réaffecte un appareil avec upsert', async () => {
    prismaMock.deviceToken.upsert.mockResolvedValue({
      id: 'device-1',
      platform: DevicePlatform.ANDROID,
      appVersion: '1.0.0',
    });

    const result = await service.register(
      { id: 'user-1' } as any,
      {
        token: 'valid-token-123456789012345',
        platform: DevicePlatform.ANDROID,
        appVersion: '1.0.0',
      },
    );

    expect(result.device.id).toBe('device-1');

    expect(prismaMock.deviceToken.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          token: 'valid-token-123456789012345',
        },
        create: expect.objectContaining({
          userId: 'user-1',
        }),
        update: expect.objectContaining({
          userId: 'user-1',
        }),
      }),
    );
  });

  it('supprime uniquement le token appartenant à l’utilisateur connecté', async () => {
    prismaMock.deviceToken.deleteMany.mockResolvedValue({ count: 1 });

    await service.remove(
      { id: 'user-1' } as any,
      'valid-token-123456789012345',
    );

    expect(prismaMock.deviceToken.deleteMany).toHaveBeenCalledWith({
      where: {
        userId: 'user-1',
        token: 'valid-token-123456789012345',
      },
    });
  });
});