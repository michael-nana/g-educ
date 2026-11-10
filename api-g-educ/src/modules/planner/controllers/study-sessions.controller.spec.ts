
import { Test, TestingModule } from '@nestjs/testing';

import { StudySessionsController } from './study-sessions.controller';
import { StudySessionsService } from '../services/study-sessions.service';

describe('StudySessionsController', () => {
  let controller: StudySessionsController;

  const studySessionsServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const user = {
    id: '11111111-1111-4111-8111-111111111111',
    role: 'ELEVE',
  } as any;

  const sessionId = '33333333-3333-4333-8333-333333333333';

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudySessionsController],
      providers: [
        {
          provide: StudySessionsService,
          useValue: studySessionsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<StudySessionsController>(
      StudySessionsController,
    );
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('devrait transmettre la création au service avec le userId authentifié', async () => {
      const dto = {
        clientId: '44444444-4444-4444-8444-444444444444',
        title: 'Révision',
        startsAt: '2026-11-10T10:00:00.000Z',
        endsAt: '2026-11-10T11:00:00.000Z',
      };

      studySessionsServiceMock.create.mockResolvedValue({
        id: sessionId,
        ...dto,
      });

      await controller.create(user, dto as any);

      expect(studySessionsServiceMock.create).toHaveBeenCalledWith(
        user.id,
        dto,
      );
    });
  });

  describe('findAll', () => {
    it('devrait transmettre les filtres et le userId authentifié au service', async () => {
      const filters = {
        from: '2026-11-01T00:00:00.000Z',
        to: '2026-11-30T23:59:59.000Z',
      };

      studySessionsServiceMock.findAll.mockResolvedValue([]);

      await controller.findAll(user, filters as any);

      expect(studySessionsServiceMock.findAll).toHaveBeenCalledWith(
        user.id,
        filters,
      );
    });
  });

  describe('update', () => {
    it('devrait transmettre la modification au service avec le userId authentifié', async () => {
      const dto = {
        title: 'Nouvelle révision',
      };

      studySessionsServiceMock.update.mockResolvedValue({
        id: sessionId,
        title: dto.title,
      });

      await controller.update(user, sessionId, dto as any);

      expect(studySessionsServiceMock.update).toHaveBeenCalledWith(
        user.id,
        sessionId,
        dto,
      );
    });
  });

  describe('remove', () => {
    it('devrait transmettre la suppression au service avec le userId authentifié', async () => {
      studySessionsServiceMock.remove.mockResolvedValue({
        id: sessionId,
        deletedAt: new Date(),
      });

      await controller.remove(user, sessionId);

      expect(studySessionsServiceMock.remove).toHaveBeenCalledWith(
        user.id,
        sessionId,
      );
    });
  });
});
