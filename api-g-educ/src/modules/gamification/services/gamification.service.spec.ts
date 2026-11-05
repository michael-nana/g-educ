
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { GamificationService } from './gamification.service';

describe('GamificationService', () => {
  let service: GamificationService;

  const prismaMock = {
    userStreak: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamificationService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<GamificationService>(
      GamificationService,
    );
  });

  describe('getStreak', () => {
    it('retourne une flamme à zéro si aucune ligne existe', async () => {
      prismaMock.userStreak.findUnique.mockResolvedValue(null);

      await expect(service.getStreak('user-id')).resolves.toEqual({
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      });
    });

    it('retourne les valeurs enregistrées lorsque la dernière activité est récente', async () => {
      const today = new Date();
      const lastActiveDate = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate(),
        ),
      );

      prismaMock.userStreak.findUnique.mockResolvedValue({
        userId: 'user-id',
        currentStreak: 5,
        longestStreak: 8,
        lastActiveDate,
        updatedAt: new Date(),
      });

      await expect(service.getStreak('user-id')).resolves.toEqual({
        currentStreak: 5,
        longestStreak: 8,
        lastActiveDate,
      });
    });

    it('retourne une flamme courante à zéro si la dernière activité est trop ancienne', async () => {
      const oldDate = new Date();
      oldDate.setUTCDate(oldDate.getUTCDate() - 3);

      prismaMock.userStreak.findUnique.mockResolvedValue({
        userId: 'user-id',
        currentStreak: 5,
        longestStreak: 8,
        lastActiveDate: oldDate,
        updatedAt: new Date(),
      });

      await expect(service.getStreak('user-id')).resolves.toEqual({
        currentStreak: 0,
        longestStreak: 8,
        lastActiveDate: oldDate,
      });
    });
  });
});
