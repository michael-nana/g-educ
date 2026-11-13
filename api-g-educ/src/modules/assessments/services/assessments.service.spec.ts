
import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { AssessmentsService } from './assessments.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';
import { GamificationService } from '../../gamification/services/gamification.service';

describe('AssessmentsService', () => {
  let service: AssessmentsService;

  const prismaMock = {
    chapter: {
      findUnique: jest.fn(),
    },
    attempt: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
    },
    assessment: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const auditServiceMock = {
    log: jest.fn(),
  };
  const teacherScopeMock = {
    assertCanManage: jest.fn(),
  };

  const gamificationServiceMock = {
    recordActivity: jest.fn(),
  };

  const txMock = {
    assessment: {
      update: jest.fn(),
    },
    attempt: {
      create: jest.fn(),
    },
    attemptAnswer: {
      create: jest.fn(),
    },
  };

  const student = {
    id: 'student-1',
    role: 'ELEVE',
    classId: 'class-1',
  };

  const assessmentFixture = () => ({
    id: 'assessment-1',
    version: 1,
    kind: 'EXERCICE',
    status: 'PUBLIE',
    durationSeconds: null,
    questions: [
      {
        id: 'question-1',
        points: 2,
        position: 1,
        options: [
          {
            id: 'option-correct',
            isCorrect: true,
          },
          {
            id: 'option-wrong',
            isCorrect: false,
          },
        ],
      },
    ],
  });

  const validDto = () => ({
    clientId: 'client-1',
    startedAt: new Date(Date.now() - 60_000).toISOString(),
    answers: [
      {
        questionId: 'question-1',
        optionIds: ['option-correct'],
      },
    ],
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssessmentsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: AuditService,
          useValue: auditServiceMock,
        },
        {
          provide: TeacherScopeService,
          useValue: teacherScopeMock,
        },
        {
          provide: GamificationService,
          useValue: gamificationServiceMock,
        },
      ],
    }).compile();

    service = module.get<AssessmentsService>(AssessmentsService);

    prismaMock.attempt.findUnique.mockResolvedValue(null);
    prismaMock.assessment.findFirst.mockResolvedValue(
      assessmentFixture(),
    );

    txMock.attempt.create.mockResolvedValue({
      id: 'attempt-1',
    });
    auditServiceMock.log.mockResolvedValue(undefined);

    txMock.attemptAnswer.create.mockResolvedValue({});
    gamificationServiceMock.recordActivity.mockResolvedValue(undefined);

    prismaMock.$transaction.mockImplementation(
      async (callback: (tx: typeof txMock) => Promise<unknown>) =>
        callback(txMock),
    );

    jest.spyOn(service, 'findMyAttemptById').mockResolvedValue({
      id: 'attempt-1',
    } as any);
  });

  describe('update', () => {
    const draftAssessment = () => ({
      id: 'assessment-1',
      title: 'Avant',
      instructions: null,
      durationSeconds: null,
      passingPercent: null,
      position: 0,
      status: 'BROUILLON',
      chapter: {
        classSubjectId: 'class-subject-1',
        classId: 'class-1',
      },
      questions: [],
    });

    it('should replace draft questions and options in the update transaction', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue(draftAssessment());
      teacherScopeMock.assertCanManage.mockResolvedValue(undefined);
      const updated = {
        ...draftAssessment(),
        title: 'Après',
        questions: [{ id: 'question-new', options: [{ id: 'option-new' }] }],
      };
      txMock.assessment.update.mockResolvedValue(updated);

      const result = await service.update(
        { id: 'admin-1', role: 'ADMINISTRATEUR' },
        'assessment-1',
        {
          title: 'Après',
          questions: [
            {
              type: 'QCM_UNIQUE',
              statement: 'Nouvelle question',
              options: [
                { label: 'Bonne', isCorrect: true },
                { label: 'Mauvaise', isCorrect: false },
              ],
            },
          ],
        } as any,
      );

      expect(result).toEqual(updated);
      expect(txMock.assessment.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'assessment-1' },
          data: expect.objectContaining({
            title: 'Après',
            questions: expect.objectContaining({
              deleteMany: {},
              create: [
                expect.objectContaining({
                  statement: 'Nouvelle question',
                  options: {
                    create: [
                      expect.objectContaining({
                        label: 'Bonne',
                        isCorrect: true,
                        position: 0,
                      }),
                      expect.objectContaining({
                        label: 'Mauvaise',
                        isCorrect: false,
                        position: 1,
                      }),
                    ],
                  },
                }),
              ],
            }),
          }),
          include: expect.objectContaining({
            questions: expect.any(Object),
          }),
        }),
      );
    });

    it('should reject invalid correct-answer configuration before updating', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue(draftAssessment());
      teacherScopeMock.assertCanManage.mockResolvedValue(undefined);

      await expect(
        service.update(
          { id: 'admin-1', role: 'ADMINISTRATEUR' },
          'assessment-1',
          {
            questions: [
              {
                type: 'QCM_UNIQUE',
                statement: 'Question',
                options: [
                  { label: 'A', isCorrect: false },
                  { label: 'B', isCorrect: false },
                ],
              },
            ],
          } as any,
        ),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('should not allow editing a published assessment', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue({
        ...draftAssessment(),
        status: 'PUBLIE',
      });
      teacherScopeMock.assertCanManage.mockResolvedValue(undefined);

      await expect(
        service.update(
          { id: 'admin-1', role: 'ADMINISTRATEUR' },
          'assessment-1',
          { title: 'Nouvelle version' },
        ),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });
  });

  describe('findForManagement', () => {
    it('should list a chapter assessments after checking management scope', async () => {
      const user = { id: 'teacher-1', role: 'ENSEIGNANT' };
      const assessments = [{ id: 'assessment-1' }];
      prismaMock.chapter.findUnique.mockResolvedValue({
        classSubjectId: 'class-subject-1',
      });
      teacherScopeMock.assertCanManage.mockResolvedValue(undefined);
      prismaMock.assessment.findMany.mockResolvedValue(assessments);

      await expect(
        service.findForManagement(user, 'chapter-1'),
      ).resolves.toEqual(assessments);

      expect(teacherScopeMock.assertCanManage).toHaveBeenCalledWith(
        user,
        'class-subject-1',
      );
      expect(prismaMock.assessment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { chapterId: 'chapter-1' },
          include: expect.objectContaining({
            questions: expect.any(Object),
            _count: { select: { attempts: true } },
          }),
        }),
      );
    });

    it('should reject a chapter that does not exist', async () => {
      prismaMock.chapter.findUnique.mockResolvedValue(null);

      await expect(
        service.findForManagement(
          { id: 'admin-1', role: 'ADMINISTRATEUR' },
          'chapter-1',
        ),
      ).rejects.toThrow(NotFoundException);

      expect(teacherScopeMock.assertCanManage).not.toHaveBeenCalled();
    });
  });

  describe('submitAttempt', () => {
    it('should reject users who are not students', async () => {
      await expect(
        service.submitAttempt(
          { ...student, role: 'ENSEIGNANT' },
          'assessment-1',
          validDto() as any,
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject students without a class', async () => {
      await expect(
        service.submitAttempt(
          { ...student, classId: null },
          'assessment-1',
          validDto() as any,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject duplicate question IDs', async () => {
      const dto = validDto();

      dto.answers.push({
        questionId: 'question-1',
        optionIds: ['option-correct'],
      });

      await expect(
        service.submitAttempt(student, 'assessment-1', dto as any),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.attempt.findUnique).not.toHaveBeenCalled();
    });

    it('should reject a clientId already used for another assessment', async () => {
      prismaMock.attempt.findUnique.mockResolvedValue({
        id: 'attempt-existing',
        assessmentId: 'another-assessment',
        status: 'TERMINEE',
      });

      await expect(
        service.submitAttempt(
          student,
          'assessment-1',
          validDto() as any,
        ),
      ).rejects.toThrow(ConflictException);
    });

    it('should return the existing attempt for an idempotent submission', async () => {
      prismaMock.attempt.findUnique.mockResolvedValue({
        id: 'attempt-existing',
        assessmentId: 'assessment-1',
        status: 'TERMINEE',
      });

      const result = await service.submitAttempt(
        student,
        'assessment-1',
        validDto() as any,
      );

      expect(service.findMyAttemptById).toHaveBeenCalledWith(
        student,
        'attempt-existing',
      );
      expect(result).toEqual({ id: 'attempt-1' });
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('should reject a start date too far in the future', async () => {
      const dto = validDto();
      dto.startedAt = new Date(Date.now() + 10 * 60_000).toISOString();

      await expect(
        service.submitAttempt(student, 'assessment-1', dto as any),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.assessment.findFirst).not.toHaveBeenCalled();
    });

    it('should reject a submission older than 48 hours', async () => {
      const dto = validDto();
      dto.startedAt = new Date(
        Date.now() - 48 * 60 * 60_000 - 1_000,
      ).toISOString();

      await expect(
        service.submitAttempt(student, 'assessment-1', dto as any),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.assessment.findFirst).not.toHaveBeenCalled();
    });

    it('should reject an assessment that is not accessible', async () => {
      prismaMock.assessment.findFirst.mockResolvedValue(null);

      await expect(
        service.submitAttempt(
          student,
          'assessment-1',
          validDto() as any,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject an assessment without questions', async () => {
      prismaMock.assessment.findFirst.mockResolvedValue({
        ...assessmentFixture(),
        questions: [],
      });

      await expect(
        service.submitAttempt(
          student,
          'assessment-1',
          validDto() as any,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject a submission exceeding the assessment duration', async () => {
      prismaMock.assessment.findFirst.mockResolvedValue({
        ...assessmentFixture(),
        durationSeconds: 30 * 60,
      });

      const dto = validDto();
      dto.startedAt = new Date(Date.now() - 31 * 60_000).toISOString();

      await expect(
        service.submitAttempt(student, 'assessment-1', dto as any),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('should reject a question that does not belong to the assessment', async () => {
      const dto = validDto();
      dto.answers[0].questionId = 'foreign-question';

      await expect(
        service.submitAttempt(student, 'assessment-1', dto as any),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('should reject an option that does not belong to its question', async () => {
      const dto = validDto();
      dto.answers[0].optionIds = ['foreign-option'];

      await expect(
        service.submitAttempt(student, 'assessment-1', dto as any),
      ).rejects.toThrow(BadRequestException);

      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('should calculate the score and save the attempt and activity transactionally', async () => {
      const result = await service.submitAttempt(
        student,
        'assessment-1',
        validDto() as any,
      );

      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);

      expect(txMock.attempt.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: student.id,
            assessmentId: 'assessment-1',
            assessmentVersion: 1,
            clientId: 'client-1',
            status: 'TERMINEE',
            score: 2,
            maxScore: 2,
            durationSeconds: expect.any(Number),
          }),
        }),
      );

      expect(txMock.attemptAnswer.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            attemptId: 'attempt-1',
            questionId: 'question-1',
            isCorrect: true,
            pointsAwarded: 2,
          }),
        }),
      );

      expect(gamificationServiceMock.recordActivity).toHaveBeenCalledWith(
        txMock,
        expect.objectContaining({
          userId: student.id,
          clientId: 'client-1',
          type: 'EXERCICE_TERMINE',
          refType: 'ASSESSMENT',
          refId: 'assessment-1',
          occurredAt: expect.any(Date),
        }),
      );

      expect(service.findMyAttemptById).toHaveBeenCalledWith(
        student,
        'attempt-1',
      );
      expect(result).toEqual({ id: 'attempt-1' });
    });

    it('should award zero points for an unanswered question', async () => {
      const dto = validDto();
      dto.answers = [];

      await service.submitAttempt(student, 'assessment-1', dto as any);

      expect(txMock.attemptAnswer.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            questionId: 'question-1',
            isCorrect: false,
            pointsAwarded: 0,
            options: {
              create: [],
            },
          }),
        }),
      );

      expect(txMock.attempt.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            score: 0,
            maxScore: 2,
          }),
        }),
      );
    });

    it('should reject an already existing unfinished attempt', async () => {
      prismaMock.attempt.findUnique.mockResolvedValue({
        id: 'attempt-existing',
        assessmentId: 'assessment-1',
        status: 'EN_COURS',
      });

      await expect(
        service.submitAttempt(
          student,
          'assessment-1',
          validDto() as any,
        ),
      ).rejects.toThrow(ConflictException);

      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });
  });
});
