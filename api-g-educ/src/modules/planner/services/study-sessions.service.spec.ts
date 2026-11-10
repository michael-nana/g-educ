
import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { StudySessionsService } from './study-sessions.service';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  Prisma,
  Recurrence,
} from '../../../generated/prisma/client';
describe('StudySessionsService', () => {
  let service: StudySessionsService;

  const prismaMock = {
    studentProfile: {
      findUnique: jest.fn(),
    },
    classSubject: {
      findFirst: jest.fn(),
    },
    studySession: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const userId = '11111111-1111-4111-8111-111111111111';
  const otherUserId = '22222222-2222-4222-8222-222222222222';
  const sessionId = '33333333-3333-4333-8333-333333333333';
  const clientId = '44444444-4444-4444-8444-444444444444';
  const subjectId = '55555555-5555-4555-8555-555555555555';

  const startsAt = '2026-11-10T10:00:00.000Z';
  const endsAt = '2026-11-10T11:00:00.000Z';

  const existingSession = {
    id: sessionId,
    userId,
    clientId,
    title: 'Révision de mathématiques',
    subjectId: null,
    startsAt: new Date(startsAt),
    endsAt: new Date(endsAt),
    recurrence: Recurrence.AUCUNE,
    recurrenceEndsOn: null,
    reminderMinutesBefore: 15,
    completedAt: null,
    createdAt: new Date('2026-11-01T10:00:00.000Z'),
    updatedAt: new Date('2026-11-01T10:00:00.000Z'),
    deletedAt: null,
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudySessionsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<StudySessionsService>(StudySessionsService);

    prismaMock.studySession.findUnique.mockResolvedValue(null);
    prismaMock.studySession.findFirst.mockResolvedValue(existingSession);
    prismaMock.studySession.findMany.mockResolvedValue([]);
    prismaMock.studySession.create.mockResolvedValue(existingSession);
    prismaMock.studySession.update.mockResolvedValue(existingSession);
    prismaMock.studentProfile.findUnique.mockResolvedValue({
      classId: '66666666-6666-4666-8666-666666666666',
    });
    prismaMock.classSubject.findFirst.mockResolvedValue({
      id: '77777777-7777-4777-8777-777777777777',
    });
  });

  describe('create', () => {
    it('devrait créer une séance avec les valeurs par défaut', async () => {
      const dto = {
        clientId,
        title: '  Révision de mathématiques  ',
        startsAt,
        endsAt,
      };

      const result = await service.create(userId, dto);

      expect(result).toEqual(existingSession);
      expect(prismaMock.studySession.findUnique).toHaveBeenCalledWith({
        where: {
          userId_clientId: {
            userId,
            clientId,
          },
        },
      });

      expect(prismaMock.studySession.create).toHaveBeenCalledWith({
        data: {
          userId,
          clientId,
          title: 'Révision de mathématiques',
          subjectId: null,
          startsAt: new Date(startsAt),
          endsAt: new Date(endsAt),
          recurrence: Recurrence.AUCUNE,
          recurrenceEndsOn: null,
          reminderMinutesBefore: 15,
        },
      });
    });

    it('ne devrait pas créer de doublon si le clientId existe déjà', async () => {
      prismaMock.studySession.findUnique.mockResolvedValue(existingSession);

      const result = await service.create(userId, {
        clientId,
        title: 'Autre titre',
        startsAt,
        endsAt,
      });

      expect(result).toEqual(existingSession);
      expect(prismaMock.studySession.create).not.toHaveBeenCalled();
    });

    it('devrait refuser un titre vide ou composé uniquement d’espaces', async () => {
      await expect(
        service.create(userId, {
          clientId,
          title: '   ',
          startsAt,
          endsAt,
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.studySession.findUnique).not.toHaveBeenCalled();
      expect(prismaMock.studySession.create).not.toHaveBeenCalled();
    });

    it('devrait refuser une date de fin antérieure à la date de début', async () => {
      await expect(
        service.create(userId, {
          clientId,
          title: 'Révision',
          startsAt,
          endsAt: '2026-11-10T09:00:00.000Z',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.studySession.create).not.toHaveBeenCalled();
    });

    it('devrait refuser une date de fin égale à la date de début', async () => {
      await expect(
        service.create(userId, {
          clientId,
          title: 'Révision',
          startsAt,
          endsAt: startsAt,
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.studySession.create).not.toHaveBeenCalled();
    });

    it('devrait refuser une récurrence sans date de fin', async () => {
      await expect(
        service.create(userId, {
          clientId,
          title: 'Révision',
          startsAt,
          endsAt,
          recurrence: Recurrence.HEBDOMADAIRE,
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.studySession.create).not.toHaveBeenCalled();
    });

    it('devrait refuser une date de fin de récurrence antérieure au début', async () => {
      await expect(
        service.create(userId, {
          clientId,
          title: 'Révision',
          startsAt,
          endsAt,
          recurrence: Recurrence.QUOTIDIENNE,
          recurrenceEndsOn: '2026-11-09',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.studySession.create).not.toHaveBeenCalled();
    });

    it('devrait accepter une récurrence avec une date de fin valide', async () => {
      await service.create(userId, {
        clientId,
        title: 'Révision quotidienne',
        startsAt,
        endsAt,
        recurrence: Recurrence.QUOTIDIENNE,
        recurrenceEndsOn: '2026-11-15',
      });

      expect(prismaMock.studySession.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          recurrence: Recurrence.QUOTIDIENNE,
          recurrenceEndsOn: new Date('2026-11-15T00:00:00.000Z'),
        }),
      });
    });

    it('devrait vérifier que la matière appartient à la classe de l’élève', async () => {
      await service.create(userId, {
        clientId,
        title: 'Révision de physique',
        subjectId,
        startsAt,
        endsAt,
      });

      expect(prismaMock.studentProfile.findUnique).toHaveBeenCalledWith({
        where: { userId },
        select: { classId: true },
      });

      expect(prismaMock.classSubject.findFirst).toHaveBeenCalledWith({
        where: {
          classId: '66666666-6666-4666-8666-666666666666',
          subjectId,
          subject: { isActive: true },
        },
        select: { id: true },
      });

      expect(prismaMock.studySession.create).toHaveBeenCalled();
    });

    it('devrait refuser une matière si le profil élève est introuvable', async () => {
      prismaMock.studentProfile.findUnique.mockResolvedValue(null);

      await expect(
        service.create(userId, {
          clientId,
          title: 'Révision',
          subjectId,
          startsAt,
          endsAt,
        }),
      ).rejects.toThrow(NotFoundException);

      expect(prismaMock.classSubject.findFirst).not.toHaveBeenCalled();
      expect(prismaMock.studySession.create).not.toHaveBeenCalled();
    });

    it('devrait refuser une matière qui ne correspond pas à la classe de l’élève', async () => {
      prismaMock.classSubject.findFirst.mockResolvedValue(null);

      await expect(
        service.create(userId, {
          clientId,
          title: 'Révision',
          subjectId,
          startsAt,
          endsAt,
        }),
      ).rejects.toThrow(NotFoundException);

      expect(prismaMock.studySession.create).not.toHaveBeenCalled();
    });

    it('devrait récupérer la séance existante après une erreur d’unicité concurrente', async () => {
  const uniqueError = new Prisma.PrismaClientKnownRequestError(
    'Unique constraint failed',
    {
      code: 'P2002',
      clientVersion: 'test',
    },
  );

  prismaMock.studySession.findUnique
    .mockResolvedValueOnce(null)
    .mockResolvedValueOnce(existingSession);

  prismaMock.studySession.create.mockRejectedValue(uniqueError);

  const result = await service.create(userId, {
    clientId,
    title: 'Révision',
    startsAt,
    endsAt,
  });

  expect(result).toEqual(existingSession);
  expect(prismaMock.studySession.findUnique).toHaveBeenCalledTimes(2);
  expect(prismaMock.studySession.create).toHaveBeenCalledTimes(1);
});
  });

  describe('findAll', () => {
    it('devrait retourner uniquement les séances non supprimées sans updatedSince', async () => {
      await service.findAll(userId, {});

      expect(prismaMock.studySession.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          deletedAt: null,
        },
        orderBy: { startsAt: 'asc' },
      });
    });

    it('devrait appliquer les filtres from et to', async () => {
      await service.findAll(userId, {
        from: '2026-11-01T00:00:00.000Z',
        to: '2026-11-30T23:59:59.000Z',
      });

      expect(prismaMock.studySession.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          deletedAt: null,
          startsAt: {
            gte: new Date('2026-11-01T00:00:00.000Z'),
            lte: new Date('2026-11-30T23:59:59.000Z'),
          },
        },
        orderBy: { startsAt: 'asc' },
      });
    });

    it('devrait refuser un filtre dont la date from dépasse la date to', async () => {
      await expect(
        service.findAll(userId, {
          from: '2026-11-20T00:00:00.000Z',
          to: '2026-11-10T00:00:00.000Z',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.studySession.findMany).not.toHaveBeenCalled();
    });

    it('devrait inclure les suppressions logiques avec updatedSince', async () => {
      await service.findAll(userId, {
        updatedSince: '2026-11-01T00:00:00.000Z',
      });

      const call = prismaMock.studySession.findMany.mock.calls[0][0];

      expect(call.where).toEqual({
        userId,
        updatedAt: {
          gte: new Date('2026-11-01T00:00:00.000Z'),
        },
      });

      expect(call.where).not.toHaveProperty('deletedAt');
      expect(call.orderBy).toEqual({ updatedAt: 'asc' });
    });

    it('devrait toujours limiter les résultats à l’élève connecté', async () => {
      await service.findAll(userId, {});

      const call = prismaMock.studySession.findMany.mock.calls[0][0];

      expect(call.where.userId).toBe(userId);
      expect(call.where.userId).not.toBe(otherUserId);
    });
  });

  describe('update', () => {
    it('devrait modifier une séance appartenant à l’élève', async () => {
      await service.update(userId, sessionId, {
        title: 'Nouvelle révision',
        completedAt: '2026-11-10T11:00:00.000Z',
      });

      expect(prismaMock.studySession.findFirst).toHaveBeenCalledWith({
        where: {
          id: sessionId,
          userId,
          deletedAt: null,
        },
      });

      expect(prismaMock.studySession.update).toHaveBeenCalledWith({
        where: {
          id: sessionId,
          userId,
          deletedAt: null,
        },
        data: expect.objectContaining({
          title: 'Nouvelle révision',
          completedAt: new Date('2026-11-10T11:00:00.000Z'),
        }),
      });
    });

    it('devrait refuser la modification d’une séance inexistante ou appartenant à un autre élève', async () => {
      prismaMock.studySession.findFirst.mockResolvedValue(null);

      await expect(
        service.update(userId, sessionId, {
          title: 'Modification',
        }),
      ).rejects.toThrow(NotFoundException);

      expect(prismaMock.studySession.update).not.toHaveBeenCalled();
    });

    it('devrait refuser une période invalide lors de la modification', async () => {
      await expect(
        service.update(userId, sessionId, {
          startsAt: '2026-11-10T12:00:00.000Z',
          endsAt: '2026-11-10T11:00:00.000Z',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.studySession.update).not.toHaveBeenCalled();
    });

    it('devrait refuser un titre vide lors de la modification', async () => {
      await expect(
        service.update(userId, sessionId, {
          title: '   ',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.studySession.update).not.toHaveBeenCalled();
    });

    it('devrait permettre de retirer la matière avec subjectId null', async () => {
      const sessionWithSubject = {
        ...existingSession,
        subjectId,
      };

      prismaMock.studySession.findFirst.mockResolvedValue(sessionWithSubject);

      await service.update(userId, sessionId, {
        subjectId: null,
      });

      expect(prismaMock.studySession.update).toHaveBeenCalledWith({
        where: {
          id: sessionId,
          userId,
          deletedAt: null,
        },
        data: expect.objectContaining({
          subjectId: null,
        }),
      });
    });

    it('devrait permettre de réinitialiser completedAt avec null', async () => {
      await service.update(userId, sessionId, {
        completedAt: null,
      });

      expect(prismaMock.studySession.update).toHaveBeenCalledWith({
        where: {
          id: sessionId,
          userId,
          deletedAt: null,
        },
        data: expect.objectContaining({
          completedAt: null,
        }),
      });
    });

    it('devrait refuser une récurrence sans date de fin lors de la modification', async () => {
      await expect(
        service.update(userId, sessionId, {
          recurrence: Recurrence.HEBDOMADAIRE,
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.studySession.update).not.toHaveBeenCalled();
    });

    it('devrait refuser une matière non autorisée lors de la modification', async () => {
      prismaMock.classSubject.findFirst.mockResolvedValue(null);

      await expect(
        service.update(userId, sessionId, {
          subjectId,
        }),
      ).rejects.toThrow(NotFoundException);

      expect(prismaMock.studySession.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('devrait supprimer logiquement une séance', async () => {
      await service.remove(userId, sessionId);

      expect(prismaMock.studySession.update).toHaveBeenCalledWith({
        where: {
          id: sessionId,
          userId,
          deletedAt: null,
        },
        data: {
          deletedAt: expect.any(Date),
        },
      });
    });

    it('devrait limiter la suppression à la séance de l’élève connecté', async () => {
      await service.remove(userId, sessionId);

      const call = prismaMock.studySession.update.mock.calls[0][0];

      expect(call.where.userId).toBe(userId);
      expect(call.where.userId).not.toBe(otherUserId);
    });
  });
});
