
import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentsController } from './assessments.controller';
import { AssessmentsService } from '../services/assessments.service';

describe('AssessmentsController', () => {
  let controller: AssessmentsController;

  const assessmentsService = {
    create: jest.fn(),
    findPublishedForStudent: jest.fn(),
    findPublishedOneForStudent: jest.fn(),
    update: jest.fn(),
    publish: jest.fn(),
    archive: jest.fn(),
    submitAttempt: jest.fn(),
    findMyAttempts: jest.fn(),
    findMyAttemptById: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentsController],
      providers: [
        {
          provide: AssessmentsService,
          useValue: assessmentsService,
        },
      ],
    }).compile();

    controller = module.get<AssessmentsController>(
      AssessmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate exercise creation to the service', async () => {
    const user = { id: 'user-1', role: 'ENSEIGNANT' } as any;
    const dto = { title: 'Exercice test' } as any;
    const result = { id: 'assessment-1' };

    assessmentsService.create.mockResolvedValue(result);

    await expect(
      controller.createExercise(user, 'chapter-1', dto),
    ).resolves.toEqual(result);

    expect(assessmentsService.create).toHaveBeenCalledWith(
      user,
      'chapter-1',
      dto,
      'EXERCICE',
    );
  });

  it('should delegate quiz creation to the service', async () => {
    const user = { id: 'user-1', role: 'ENSEIGNANT' } as any;
    const dto = { title: 'Quiz test' } as any;

    assessmentsService.create.mockResolvedValue({ id: 'quiz-1' });

    await controller.createQuiz(user, 'chapter-1', dto);

    expect(assessmentsService.create).toHaveBeenCalledWith(
      user,
      'chapter-1',
      dto,
      'QUIZ',
    );
  });

  it('should delegate attempt submission to the service', async () => {
    const user = {
      id: 'student-1',
      role: 'ELEVE',
      classId: 'class-1',
    } as any;
    const dto = { clientId: 'client-1', answers: [] } as any;
    const result = { id: 'attempt-1' };

    assessmentsService.submitAttempt.mockResolvedValue(result);

    await expect(
      controller.submitAttempt(user, 'assessment-1', dto),
    ).resolves.toEqual(result);

    expect(assessmentsService.submitAttempt).toHaveBeenCalledWith(
      user,
      'assessment-1',
      dto,
    );
  });

  it('should delegate student attempt history to the service', async () => {
    const user = { id: 'student-1', role: 'ELEVE' } as any;
    const filters = { assessmentId: 'assessment-1' } as any;

    assessmentsService.findMyAttempts.mockResolvedValue([]);

    await expect(
      controller.findMyAttempts(user, filters),
    ).resolves.toEqual([]);

    expect(assessmentsService.findMyAttempts).toHaveBeenCalledWith(
      user,
      filters,
    );
  });

  it('should delegate attempt detail to the service', async () => {
    const user = { id: 'student-1', role: 'ELEVE' } as any;
    const result = { id: 'attempt-1' };

    assessmentsService.findMyAttemptById.mockResolvedValue(result);

    await expect(
      controller.findMyAttemptById(user, 'attempt-1'),
    ).resolves.toEqual(result);

    expect(assessmentsService.findMyAttemptById).toHaveBeenCalledWith(
      user,
      'attempt-1',
    );
  });
});
