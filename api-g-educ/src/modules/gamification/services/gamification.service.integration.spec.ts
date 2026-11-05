
import 'dotenv/config';
import { randomUUID } from 'crypto';
import {
  ActivityRefType,
  ActivityType,
  Role,
} from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { GamificationService } from './gamification.service';

describe('GamificationService - PostgreSQL integration', () => {
  let service: GamificationService;
  let prisma: PrismaService;

  // Compte technique réservé aux tests d'intégration.
const userId = 'f7d1c9a2-6b34-4e85-9f12-8c3a5d7e9012';

const TEST_PHONE = '+22670000001';

const RECOMPUTE_CLIENT_IDS = [
  'a1000000-0000-4000-8000-000000000001',
  'a1000000-0000-4000-8000-000000000002',
  'a1000000-0000-4000-8000-000000000003',
];

const RECOMPUTE_DAYS = [
  new Date('2020-01-01T00:00:00.000Z'),
  new Date('2020-01-02T00:00:00.000Z'),
  new Date('2020-01-04T00:00:00.000Z'),
];
  const refId = randomUUID();

  jest.setTimeout(60000);

  const utcDay = (offset = 0) => {
    const now = new Date();

    return new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + offset,
      ),
    );
  };

  const makeInput = (
    clientId: string,
    type: ActivityType = ActivityType.LECON_TERMINEE,
  ) => ({
    userId,
    clientId,
    type,
    refType:
      type === ActivityType.FORUM_REPONSE
        ? ActivityRefType.FORUM_ANSWER
        : ActivityRefType.LESSON,
    refId,
    occurredAt: new Date(),
  });

beforeAll(async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL est introuvable.');
  }

  prisma = new PrismaService(
    {
      getOrThrow: () => process.env.DATABASE_URL,
    } as any,
    {
      get: () => undefined,
    } as any,
  );

  await prisma.$connect();

  service = new GamificationService(prisma);

  // Vérifier si le compte technique existe déjà.
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    // Vérifier que le numéro n'est pas déjà utilisé.
    const existingPhone = await prisma.user.findUnique({
      where: { phone: TEST_PHONE },
    });

    if (existingPhone) {
      throw new Error(
        'Le numéro réservé au test est déjà utilisé par un autre compte.',
      );
    }

    await prisma.user.create({
      data: {
        id: userId,
        phone: TEST_PHONE,
        passwordHash: 'integration-test-not-a-real-password',
        role: Role.ELEVE,
      },
    });
  } else if (existingUser.role !== Role.ELEVE) {
    throw new Error(
      'Le compte technique Gamification doit avoir le rôle ELEVE.',
    );
  }
});


  afterAll(async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
  });

  describe('recordActivity', () => {
    it('valide les activités, les doublons et les streaks', async () => {
      const rollback = new Error('ROLLBACK_GAMIFICATION_TEST');

      const firstClientId = randomUUID();
      const secondClientId = randomUUID();
      const consecutiveClientId = randomUUID();
      const resetClientId = randomUUID();
      const forumClientId = randomUUID();

      const clientIds = [
        firstClientId,
        secondClientId,
        consecutiveClientId,
        resetClientId,
        forumClientId,
      ];

      await expect(
        prisma.$transaction(
          async (tx) => {

            // Initialiser le streak uniquement pour ce test.
// La transaction sera annulée à la fin.
await tx.userStreak.upsert({
  where: { userId },
  create: {
    userId,
    currentStreak: 0,
    longestStreak: 0,
  },
  update: {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
  },
});
            // 1. Première activité.
            const first = await service.recordActivity(
              tx,
              makeInput(firstClientId),
            );

            expect(first).toMatchObject({
              recorded: true,
              duplicate: false,
              streakUpdated: true,
              currentStreak: 1,
              longestStreak: 1,
            });

            // 2. Même clientId : doublon.
            const duplicate = await service.recordActivity(
              tx,
              makeInput(firstClientId),
            );

            expect(duplicate).toEqual({
              recorded: false,
              duplicate: true,
              streakUpdated: false,
            });

            // 3. Deuxième activité le même jour.
            const second = await service.recordActivity(
              tx,
              makeInput(secondClientId),
            );

            expect(second).toMatchObject({
              recorded: true,
              duplicate: false,
              streakUpdated: false,
            });

            // 4. Préparer un streak se terminant hier.
            await tx.userStreak.update({
              where: { userId },
              data: {
                currentStreak: 4,
                longestStreak: 8,
                lastActiveDate: utcDay(-1),
              },
            });

            // Aujourd'hui : incrémentation de 4 à 5.
            const consecutive = await service.recordActivity(
              tx,
              makeInput(consecutiveClientId),
            );

            expect(consecutive).toMatchObject({
              recorded: true,
              duplicate: false,
              streakUpdated: true,
              currentStreak: 5,
              longestStreak: 8,
            });

            // 5. Simuler une interruption de deux jours.
            await tx.userStreak.update({
              where: { userId },
              data: {
                currentStreak: 5,
                longestStreak: 8,
                lastActiveDate: utcDay(-2),
              },
            });

            // Aujourd'hui : réinitialisation à 1.
            const reset = await service.recordActivity(
              tx,
              makeInput(resetClientId),
            );

            expect(reset).toMatchObject({
              recorded: true,
              duplicate: false,
              streakUpdated: true,
              currentStreak: 1,
              longestStreak: 8,
            });

            // 6. Activité forum : aucun incrément.
            const forum = await service.recordActivity(
              tx,
              makeInput(
                forumClientId,
                ActivityType.FORUM_REPONSE,
              ),
            );

            expect(forum).toEqual({
              recorded: true,
              duplicate: false,
              streakUpdated: false,
            });

            // 7. Vérifier les cinq activités.
            const logs = await tx.activityLog.findMany({
              where: {
                userId,
                clientId: { in: clientIds },
              },
            });

            expect(logs).toHaveLength(5);

            // 8. Vérifier le streak final.
            const streak = await tx.userStreak.findUniqueOrThrow({
              where: { userId },
            });

            expect(streak.currentStreak).toBe(1);
            expect(streak.longestStreak).toBe(8);

            // Annulation volontaire.
            throw rollback;
          },

          
          { timeout: 30000 },

          
        ),
      ).rejects.toBe(rollback);

      

      // Vérifier que la transaction a bien été annulée.
      const remainingLogs = await prisma.activityLog.count({
        where: {
          userId,
          clientId: { in: clientIds },
        },
      });

      expect(remainingLogs).toBe(0);
    });
  });

describe('recomputeStreak', () => {
  it('reconstruit le streak depuis le journal des activités', async () => {
    const previousStreak = await prisma.userStreak.findUnique({
      where: { userId },
    });

    try {
      // Créer les activités historiques.
      // createMany + skipDuplicates permet de relancer le test
      // sans créer de doublons.
      await prisma.activityLog.createMany({
        skipDuplicates: true,
        data: RECOMPUTE_CLIENT_IDS.map((clientId, index) => ({
          userId,
          clientId,
          type: ActivityType.LECON_TERMINEE,
          refType: ActivityRefType.LESSON,
          refId: randomUUID(),
          occurredAt: new Date(
            RECOMPUTE_DAYS[index].getTime() + 12 * 60 * 60 * 1000,
          ),
          activityDate: RECOMPUTE_DAYS[index],
        })),
      });

      // Simuler un cache incorrect.
      await prisma.userStreak.upsert({
        where: { userId },
        create: {
          userId,
          currentStreak: 99,
          longestStreak: 99,
        },
        update: {
          currentStreak: 99,
          longestStreak: 99,
        },
      });

      // Recalculer à partir du journal.
      const result = await service.recomputeStreak(userId);

      // J-1 : 01/01/2020
      // J-2 : 02/01/2020
      // Interruption : 03/01/2020
      // Dernière activité : 04/01/2020
      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(2);

      expect(result.lastActiveDate?.getTime()).toBe(
        RECOMPUTE_DAYS[2].getTime(),
      );
    } finally {
      // Restaurer le streak initial.
      if (previousStreak) {
        await prisma.userStreak.update({
          where: { userId },
          data: {
            currentStreak: previousStreak.currentStreak,
            longestStreak: previousStreak.longestStreak,
            lastActiveDate: previousStreak.lastActiveDate,
          },
        });
      } else {
        await prisma.userStreak.deleteMany({
          where: { userId },
        });
      }
    }
  });
});
});
