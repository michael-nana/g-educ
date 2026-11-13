
import {
  BadRequestException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { AssessmentFilterDto } from '../dto/assessment-filter.dto';
import { AuditService } from '../../audit/services/audit.service';
import { AUDIT_ACTIONS } from '../../audit/constants/audit-actions.constants';
import type { UpdateAssessmentDto } from '../dto/update-assessment.dto';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';
import { ConflictException } from '@nestjs/common';

import { AttemptFilterDto } from '../dto/attempt-filter.dto';
import { SubmitAttemptDto } from '../dto/submit-attempt.dto';

import { GamificationService } from '../../gamification/services/gamification.service';
import type { CreateAssessmentDto } from '../dto/create-assessment.dto';

@Injectable()
export class AssessmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly teacherScope: TeacherScopeService,
      private readonly gamificationService: GamificationService,

  ) {}

  async create(
    user: { id: string; role: string },
    chapterId: string,
    dto: CreateAssessmentDto,
    kind: 'EXERCICE' | 'QUIZ',
  ) {
    // 1. Vérifier l'existence du chapitre.
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
      select: {
        id: true,
        classId: true,
        classSubjectId: true,
        status: true,
      },
    });

    if (!chapter) {
      throw new NotFoundException('Chapitre introuvable');
    }

    if (chapter.status === 'ARCHIVE') {
      throw new BadRequestException(
        'Impossible de créer une évaluation dans un chapitre archivé',
      );
    }

    // 2. Vérifier les droits de gestion.
    const classSubject = await this.teacherScope.assertCanManage(
      user,
      chapter.classSubjectId,
    );

    if (classSubject.classId !== chapter.classId) {
      throw new NotFoundException('Chapitre introuvable');
    }

    // 3. Valider le titre.
    const title = dto.title.trim();

    if (!title) {
      throw new BadRequestException(
        'Le titre de l’évaluation est obligatoire',
      );
    }

    // 4. Valider les questions et leurs options.
    for (const question of dto.questions ?? []) {
      const options = question.options;
      const correctCount = options.filter(
        (option) => option.isCorrect,
      ).length;

      if (question.type === 'QCM_UNIQUE' && correctCount !== 1) {
        throw new BadRequestException(
          'Une question QCM_UNIQUE doit avoir exactement une bonne réponse',
        );
      }

      if (question.type === 'QCM_MULTIPLE' && correctCount < 1) {
        throw new BadRequestException(
          'Une question QCM_MULTIPLE doit avoir au moins une bonne réponse',
        );
      }

      if (
        question.type === 'VRAI_FAUX' &&
        (options.length !== 2 || correctCount !== 1)
      ) {
        throw new BadRequestException(
          'Une question VRAI_FAUX doit avoir exactement deux options et une seule bonne réponse',
        );
      }
    }

    // 5. Créer l'évaluation, les questions et les options.
    return this.prisma.$transaction(async (tx) => {
      const assessment = await tx.assessment.create({
        data: {
          chapterId,
          classId: chapter.classId,
          kind,
          title,
          instructions: dto.instructions?.trim() || null,
          durationSeconds: dto.durationSeconds ?? null,
          passingPercent: dto.passingPercent ?? null,
          position: dto.position ?? 0,
          createdById: user.id,

          ...(dto.questions?.length
            ? {
                questions: {
                  create: dto.questions.map(
                    (question, questionIndex) => ({
                      type: question.type,
                      statement: question.statement.trim(),
                      explanation:
                        question.explanation?.trim() || null,
                      imageKey: question.imageKey ?? null,
                      points: question.points ?? 1,
                      position: question.position ?? questionIndex,

                      options: {
                        create: question.options.map(
                          (option, optionIndex) => ({
                            label: option.label.trim(),
                            isCorrect: option.isCorrect,
                            position:
                              option.position ?? optionIndex,
                          }),
                        ),
                      },
                    }),
                  ),
                },
              }
            : {}),
        },

        include: {
          questions: {
            orderBy: {
              position: 'asc',
            },
            include: {
              options: {
                orderBy: {
                  position: 'asc',
                },
              },
            },
          },
        },
      });

      // 6. Enregistrer l'opération dans l'audit.
      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.ASSESSMENT_CREATED,
          entityType: 'Assessment',
          entityId: assessment.id,
          after: {
            title: assessment.title,
            kind: assessment.kind,
            chapterId: assessment.chapterId,
            classId: assessment.classId,
            status: assessment.status,
            questionCount: assessment.questions.length,
          },
        },
        tx,
      );

      return assessment;
    });
  }

  async findForManagement(
    user: { id: string; role: string },
    chapterId: string,
  ) {
    if (!['ADMINISTRATEUR', 'ENSEIGNANT'].includes(user.role)) {
      throw new ForbiddenException(
        'Vous n’êtes pas autorisé à consulter ces évaluations',
      );
    }

    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
      select: { classSubjectId: true },
    });

    if (!chapter) {
      throw new NotFoundException('Chapitre introuvable');
    }

    await this.teacherScope.assertCanManage(user, chapter.classSubjectId);

    return this.prisma.assessment.findMany({
      where: { chapterId },
      include: {
        questions: {
          orderBy: { position: 'asc' },
          include: {
            options: {
              orderBy: { position: 'asc' },
            },
          },
        },
        _count: {
          select: { attempts: true },
        },
      },
      orderBy: [{ position: 'asc' }, { createdAt: 'desc' }],
    });
  }

  
async update(
  user: { id: string; role: string },
  assessmentId: string,
  dto: UpdateAssessmentDto,
) {
  // 1. Rechercher l'évaluation.
  const assessment = await this.prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      chapter: {
        select: {
          classSubjectId: true,
          classId: true,
        },
      },
      questions: {
        include: { options: true },
        orderBy: { position: 'asc' },
      },
    },
  });

  if (!assessment) {
    throw new NotFoundException('Évaluation introuvable');
  }

  // 2. Vérifier les droits de gestion.
  await this.teacherScope.assertCanManage(
    user,
    assessment.chapter.classSubjectId,
  );

  // 3. Seuls les brouillons sont modifiables.
  if (assessment.status !== 'BROUILLON') {
    throw new BadRequestException(
      'Seules les évaluations en brouillon peuvent être modifiées',
    );
  }

  // 4. Vérifier que des modifications sont fournies.
  if (
    dto.title === undefined &&
    dto.instructions === undefined &&
    dto.durationSeconds === undefined &&
    dto.passingPercent === undefined &&
    dto.position === undefined &&
    dto.questions === undefined
  ) {
    throw new BadRequestException(
      'Aucune modification fournie',
    );
  }

  if (dto.title !== undefined && !dto.title.trim()) {
    throw new BadRequestException(
      'Le titre de l’évaluation est obligatoire',
    );
  }

  for (const question of dto.questions ?? []) {
    const correctCount = question.options.filter(
      (option) => option.isCorrect,
    ).length;

    if (question.type === 'QCM_UNIQUE' && correctCount !== 1) {
      throw new BadRequestException(
        'Une question QCM_UNIQUE doit avoir exactement une bonne réponse',
      );
    }

    if (question.type === 'QCM_MULTIPLE' && correctCount < 1) {
      throw new BadRequestException(
        'Une question QCM_MULTIPLE doit avoir au moins une bonne réponse',
      );
    }

    if (
      question.type === 'VRAI_FAUX' &&
      (question.options.length !== 2 || correctCount !== 1)
    ) {
      throw new BadRequestException(
        'Une question VRAI_FAUX doit avoir exactement deux options et une seule bonne réponse',
      );
    }
  }

  // 5. Préparer les modifications.
  const data = {
    ...(dto.title !== undefined && {
      title: dto.title.trim(),
    }),
    ...(dto.instructions !== undefined && {
      instructions: dto.instructions.trim() || null,
    }),
    ...(dto.durationSeconds !== undefined && {
      durationSeconds: dto.durationSeconds,
    }),
    ...(dto.passingPercent !== undefined && {
      passingPercent: dto.passingPercent,
    }),
    ...(dto.position !== undefined && {
      position: dto.position,
    }),
  };

  // 6. Modifier et journaliser dans une transaction.
  return this.prisma.$transaction(async (tx) => {
    const updated = await tx.assessment.update({
      where: { id: assessmentId },
      data: {
        ...data,
        ...(dto.questions !== undefined && {
          questions: {
            deleteMany: {},
            create: dto.questions.map((question, questionIndex) => ({
              type: question.type,
              statement: question.statement.trim(),
              explanation: question.explanation?.trim() || null,
              imageKey: question.imageKey ?? null,
              points: question.points ?? 1,
              position: question.position ?? questionIndex,
              options: {
                create: question.options.map((option, optionIndex) => ({
                  label: option.label.trim(),
                  isCorrect: option.isCorrect,
                  position: option.position ?? optionIndex,
                })),
              },
            })),
          },
        }),
      },
      include: {
        questions: {
          orderBy: { position: 'asc' },
          include: {
            options: {
              orderBy: { position: 'asc' },
            },
          },
        },
        _count: {
          select: { attempts: true },
        },
      },
    });

    await this.auditService.log(
      {
        action: AUDIT_ACTIONS.ASSESSMENT_UPDATED,
        entityType: 'Assessment',
        entityId: assessmentId,
        before: {
          title: assessment.title,
          instructions: assessment.instructions,
          durationSeconds: assessment.durationSeconds,
          passingPercent: assessment.passingPercent,
          position: assessment.position,
          status: assessment.status,
          questionCount: assessment.questions.length,
        },
        after: {
          title: updated.title,
          instructions: updated.instructions,
          durationSeconds: updated.durationSeconds,
          passingPercent: updated.passingPercent,
          position: updated.position,
          status: updated.status,
          questionCount: updated.questions.length,
        },
      },
      tx,
    );

    return updated;
  });
}


async findPublishedForStudent(
  user: { id: string; role: string; classId: string | null },
  filters: AssessmentFilterDto,
) {
  if (user.role !== 'ELEVE') {
    throw new ForbiddenException(
      'Cette fonctionnalité est réservée aux élèves',
    );
  }

  if (!user.classId) {
    throw new NotFoundException('Classe de l’élève introuvable');
  }

  return this.prisma.assessment.findMany({
    where: {
      classId: user.classId,
      status: 'PUBLIE',
      chapter: {
        status: 'PUBLIE',
      },
      ...(filters.chapterId
        ? { chapterId: filters.chapterId }
        : {}),
    },
    select: {
      id: true,
      kind: true,
      title: true,
      instructions: true,
      durationSeconds: true,
      passingPercent: true,
      position: true,
      version: true,
      publishedAt: true,
      chapter: {
        select: {
          id: true,
          title: true,
          classSubject: {
            select: {
              id: true,
              subject: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          questions: true,
        },
      },
    },
    orderBy: [
      { chapterId: 'asc' },
      { position: 'asc' },
      { createdAt: 'desc' },
    ],
  });
}

async findPublishedOneForStudent(
  user: { id: string; role: string; classId: string | null },
  assessmentId: string,
) {
  if (user.role !== 'ELEVE') {
    throw new ForbiddenException(
      'Cette fonctionnalité est réservée aux élèves',
    );
  }

  if (!user.classId) {
    throw new NotFoundException('Classe de l’élève introuvable');
  }

  const assessment = await this.prisma.assessment.findFirst({
    where: {
      id: assessmentId,
      classId: user.classId,
      status: 'PUBLIE',
      chapter: {
        status: 'PUBLIE',
      },
    },
    select: {
      id: true,
      kind: true,
      title: true,
      instructions: true,
      durationSeconds: true,
      passingPercent: true,
      position: true,
      version: true,
      publishedAt: true,
      chapter: {
        select: {
          id: true,
          title: true,
          classSubject: {
            select: {
              id: true,
              subject: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
      questions: {
        select: {
          id: true,
          type: true,
          statement: true,
          imageKey: true,
          points: true,
          position: true,
          options: {
            select: {
              id: true,
              label: true,
              position: true,
            },
            orderBy: {
              position: 'asc',
            },
          },
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!assessment) {
    throw new NotFoundException('Évaluation introuvable');
  }

  return assessment;
}


async publish(
  user: { id: string; role: string; canPublish: boolean },
  assessmentId: string,
) {
  const assessment = await this.prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      chapter: {
        select: {
          classSubjectId: true,
          classId: true,
        },
      },
      questions: {
        include: {
          options: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!assessment) {
    throw new NotFoundException('Évaluation introuvable');
  }

  if (
    user.role !== 'ADMINISTRATEUR' &&
    (user.role !== 'ENSEIGNANT' || !user.canPublish)
  ) {
    throw new ForbiddenException(
      'Vous n’êtes pas autorisé à publier une évaluation',
    );
  }

  await this.teacherScope.assertCanManage(
    user,
    assessment.chapter.classSubjectId,
  );

  if (assessment.status !== 'BROUILLON') {
    throw new BadRequestException(
      'Seules les évaluations en brouillon peuvent être publiées',
    );
  }

  if (assessment.questions.length === 0) {
    throw new BadRequestException(
      'Une évaluation doit contenir au moins une question',
    );
  }

  for (const question of assessment.questions) {
    const optionCount = question.options.length;
    const correctCount = question.options.filter(
      (option) => option.isCorrect,
    ).length;

    if (question.type === 'QCM_UNIQUE') {
      if (optionCount < 2 || correctCount !== 1) {
        throw new BadRequestException(
          `La question "${question.statement}" doit avoir au moins deux options et exactement une bonne réponse`,
        );
      }
    }

    if (question.type === 'QCM_MULTIPLE') {
      if (optionCount < 2 || correctCount < 1) {
        throw new BadRequestException(
          `La question "${question.statement}" doit avoir au moins deux options et une bonne réponse`,
        );
      }
    }

    if (question.type === 'VRAI_FAUX') {
      if (optionCount !== 2 || correctCount !== 1) {
        throw new BadRequestException(
          `La question "${question.statement}" doit avoir exactement deux options et une bonne réponse`,
        );
      }
    }
  }

  return this.prisma.$transaction(async (tx) => {
    const published = await tx.assessment.update({
      where: { id: assessmentId },
      data: {
        status: 'PUBLIE',
        publishedById: user.id,
        publishedAt: new Date(),
      },
      include: {
        questions: {
          include: {
            options: {
              orderBy: {
                position: 'asc',
              },
            },
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    await this.auditService.log(
      {
        action: AUDIT_ACTIONS.ASSESSMENT_PUBLISHED,
        entityType: 'Assessment',
        entityId: assessmentId,
        before: {
          status: assessment.status,
          publishedById: assessment.publishedById,
          publishedAt: assessment.publishedAt,
        },
        after: {
          status: published.status,
          publishedById: published.publishedById,
          publishedAt: published.publishedAt,
          questionCount: published.questions.length,
        },
      },
      tx,
    );

    return published;
  });
}

async archive(
  user: { id: string; role: string; canPublish: boolean },
  assessmentId: string,
) {
  const assessment = await this.prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      chapter: {
        select: {
          classSubjectId: true,
          classId: true,
        },
      },
    },
  });

  if (!assessment) {
    throw new NotFoundException('Évaluation introuvable');
  }

  if (
    user.role !== 'ADMINISTRATEUR' &&
    (user.role !== 'ENSEIGNANT' || !user.canPublish)
  ) {
    throw new ForbiddenException(
      'Vous n’êtes pas autorisé à archiver une évaluation',
    );
  }

  await this.teacherScope.assertCanManage(
    user,
    assessment.chapter.classSubjectId,
  );

  if (assessment.status === 'ARCHIVE') {
    throw new BadRequestException(
      'Cette évaluation est déjà archivée',
    );
  }

  return this.prisma.$transaction(async (tx) => {
    const archived = await tx.assessment.update({
      where: { id: assessmentId },
      data: {
        status: 'ARCHIVE',
      },
    });

    await this.auditService.log(
      {
        action: AUDIT_ACTIONS.ASSESSMENT_ARCHIVED,
        entityType: 'Assessment',
        entityId: assessmentId,
        before: {
          title: assessment.title,
          kind: assessment.kind,
          status: assessment.status,
          publishedById: assessment.publishedById,
          publishedAt: assessment.publishedAt,
        },
        after: {
          title: archived.title,
          kind: archived.kind,
          status: archived.status,
          publishedById: archived.publishedById,
          publishedAt: archived.publishedAt,
        },
      },
      tx,
    );

    return archived;
  });
}


async submitAttempt(
  user: { id: string; role: string; classId: string | null },
  assessmentId: string,
  dto: SubmitAttemptDto,
) {
  if (user.role !== 'ELEVE') {
    throw new ForbiddenException(
      'Seuls les élèves peuvent soumettre une évaluation',
    );
  }

  if (!user.classId) {
    throw new NotFoundException('Classe de l’élève introuvable');
  }

  if (
  new Set(dto.answers.map((answer) => answer.questionId)).size !==
  dto.answers.length
) {
  throw new BadRequestException(
    'Une question ne peut apparaître qu’une seule fois dans la soumission',
  );
}

  // Vérifier l'idempotence avant toute nouvelle création.
  const existing = await this.prisma.attempt.findUnique({
    where: {
      userId_clientId: {
        userId: user.id,
        clientId: dto.clientId,
      },
    },
    select: {
      id: true,
      assessmentId: true,
      status: true,
    },
  });

  if (existing) {
    if (existing.assessmentId !== assessmentId) {
      throw new ConflictException(
        'Ce clientId est déjà utilisé pour une autre évaluation',
      );
    }

    if (existing.status !== 'TERMINEE') {
      throw new ConflictException(
        'Une tentative existe déjà mais elle n’est pas terminée',
      );
    }

    return this.findMyAttemptById(user, existing.id);
  }

const requestedStartedAt = new Date(dto.startedAt);
const submittedAt = new Date();

if (Number.isNaN(requestedStartedAt.getTime())) {
  throw new BadRequestException('Date de début invalide');
}

const futureToleranceMilliseconds = 5 * 60 * 1000;

if (
  requestedStartedAt.getTime() >
  submittedAt.getTime() + futureToleranceMilliseconds
) {
  throw new BadRequestException(
    'La date de début ne peut pas être dans le futur',
  );
}

// Une date légèrement future est ramenée à l'heure du serveur.
const startedAt =
  requestedStartedAt.getTime() > submittedAt.getTime()
    ? submittedAt
    : requestedStartedAt;

const elapsedMilliseconds =
  submittedAt.getTime() - startedAt.getTime();

const maxOfflineMilliseconds = 48 * 60 * 60 * 1000;

if (elapsedMilliseconds > maxOfflineMilliseconds) {
  throw new BadRequestException(
    'La tentative dépasse le délai maximal de soumission de 48 heures',
  );
}

  // Vérifier que l'évaluation est accessible à cet élève.
  const assessment = await this.prisma.assessment.findFirst({
    where: {
      id: assessmentId,
      classId: user.classId,
      status: 'PUBLIE',
      chapter: {
        status: 'PUBLIE',
      },
    },
    include: {
      questions: {
        include: {
          options: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!assessment) {
    throw new NotFoundException('Évaluation introuvable');
  }

  if (assessment.questions.length === 0) {
    throw new BadRequestException(
      'Cette évaluation ne contient aucune question',
    );
  }

  // Vérifier la durée maximale autorisée.
if (
  assessment.durationSeconds !== null &&
  elapsedMilliseconds > assessment.durationSeconds * 1000
) {
  throw new BadRequestException(
    'Le temps autorisé pour cette évaluation est dépassé',
  );
}

  // Indexer les réponses reçues.
  const submittedAnswers = new Map(
    dto.answers.map((answer) => [
      answer.questionId,
      answer.optionIds,
    ]),
  );

  // Vérifier que toutes les questions soumises appartiennent
  // réellement à cette évaluation.
  const questionIds = new Set(
    assessment.questions.map((question) => question.id),
  );

  for (const answer of dto.answers) {
    if (!questionIds.has(answer.questionId)) {
      throw new BadRequestException(
        'Une réponse contient une question étrangère à cette évaluation',
      );
    }
  }

  // Calculer le score côté serveur.
  let score = 0;
  const maxScore = assessment.questions.reduce(
    (total, question) => total + question.points,
    0,
  );

  const correctedAnswers = assessment.questions.map((question) => {
    const selectedOptionIds =
      submittedAnswers.get(question.id) ?? [];

    const availableOptionIds = new Set(
      question.options.map((option) => option.id),
    );

    // Vérifier que chaque option sélectionnée appartient
    // à la question concernée.
    for (const optionId of selectedOptionIds) {
      if (!availableOptionIds.has(optionId)) {
        throw new BadRequestException(
          'Une option sélectionnée ne correspond pas à sa question',
        );
      }
    }

    const correctOptionIds = question.options
      .filter((option) => option.isCorrect)
      .map((option) => option.id);

    // Correction exacte : toutes les bonnes options,
    // et aucune mauvaise option, doivent être sélectionnées.
    const selectedSet = new Set(selectedOptionIds);
    const correctSet = new Set(correctOptionIds);

    const isCorrect =
      selectedSet.size === correctSet.size &&
      [...correctSet].every((id) => selectedSet.has(id));

    const pointsAwarded = isCorrect ? question.points : 0;

    score += pointsAwarded;

    return {
      questionId: question.id,
      selectedOptionIds,
      isCorrect,
      pointsAwarded,
    };
  });

const durationSeconds = Math.floor(
  elapsedMilliseconds / 1000,
);

  let attemptId: string;

  try {
    attemptId = await this.prisma.$transaction(async (tx) => {
      // 1. Créer la tentative terminée.
      const attempt = await tx.attempt.create({
        data: {
          userId: user.id,
          assessmentId: assessment.id,
          assessmentVersion: assessment.version,
          clientId: dto.clientId,
          status: 'TERMINEE',
          startedAt,
          submittedAt,
          score,
          maxScore,
          durationSeconds,
        },
      });

      // 2. Enregistrer chaque réponse, y compris les questions
      // sans réponse, qui obtiennent zéro point.
      for (const answer of correctedAnswers) {
        await tx.attemptAnswer.create({
          data: {
            attemptId: attempt.id,
            questionId: answer.questionId,
            isCorrect: answer.isCorrect,
            pointsAwarded: answer.pointsAwarded,
            answeredAt: submittedAt,
            options: {
              create: answer.selectedOptionIds.map((optionId) => ({
                option: {
                  connect: {
                    id: optionId,
                  },
                },
              })),
            },
          },
        });
      }

      // 3. Enregistrer l'activité dans la même transaction.
      await this.gamificationService.recordActivity(tx, {
        userId: user.id,
        clientId: dto.clientId,
        type:
          assessment.kind === 'EXERCICE'
            ? 'EXERCICE_TERMINE'
            : 'QUIZ_TERMINE',
        refType: 'ASSESSMENT',
        refId: assessment.id,
        occurredAt: submittedAt,
      });

      return attempt.id;
    });

  } catch (error) {
    // Une soumission simultanée avec le même clientId peut
    // provoquer une violation de la contrainte unique.
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      const concurrentAttempt =
        await this.prisma.attempt.findUnique({
          where: {
            userId_clientId: {
              userId: user.id,
              clientId: dto.clientId,
            },
          },
          select: {
            id: true,
            assessmentId: true,
            status: true,
          },
        });

      if (concurrentAttempt) {
        if (concurrentAttempt.assessmentId !== assessmentId) {
          throw new ConflictException(
            'Ce clientId est déjà utilisé pour une autre évaluation',
          );
        }

        if (concurrentAttempt.status === 'TERMINEE') {
          return this.findMyAttemptById(
            user,
            concurrentAttempt.id,
          );
        }
      }
    }

    throw error;
  }

  return this.findMyAttemptById(user, attemptId);
}


async findMyAttempts(
  user: { id: string; role: string },
  filters: AttemptFilterDto,
) {
  if (user.role !== 'ELEVE') {
    throw new ForbiddenException(
      'Cette fonctionnalité est réservée aux élèves',
    );
  }

  return this.prisma.attempt.findMany({
    where: {
      userId: user.id,
      status: 'TERMINEE',
      ...(filters.assessmentId
        ? { assessmentId: filters.assessmentId }
        : {}),
    },
    select: {
      id: true,
      assessmentId: true,
      assessmentVersion: true,
      status: true,
      startedAt: true,
      submittedAt: true,
      score: true,
      maxScore: true,
      durationSeconds: true,
      createdAt: true,
      assessment: {
        select: {
          id: true,
          title: true,
          kind: true,
          passingPercent: true,
        },
      },
    },
    orderBy: {
      submittedAt: 'desc',
    },
  });
}

async findMyAttemptById(
  user: { id: string; role: string },
  attemptId: string,
) {
  if (user.role !== 'ELEVE') {
    throw new ForbiddenException(
      'Cette fonctionnalité est réservée aux élèves',
    );
  }

  const attempt = await this.prisma.attempt.findFirst({
    where: {
      id: attemptId,
      userId: user.id,
      status: 'TERMINEE',
    },
    select: {
      id: true,
      assessmentId: true,
      assessmentVersion: true,
      status: true,
      startedAt: true,
      submittedAt: true,
      score: true,
      maxScore: true,
      durationSeconds: true,
      createdAt: true,
      assessment: {
        select: {
          id: true,
          title: true,
          kind: true,
          passingPercent: true,
          durationSeconds: true,
          chapter: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      answers: {
        select: {
          id: true,
          isCorrect: true,
          pointsAwarded: true,
          answeredAt: true,
          question: {
            select: {
              id: true,
              type: true,
              statement: true,
              explanation: true,
              points: true,
              position: true,
              options: {
                select: {
                  id: true,
                  label: true,
                  isCorrect: true,
                  position: true,
                },
                orderBy: {
                  position: 'asc',
                },
              },
            },
          },
          options: {
            select: {
              option: {
                select: {
                  id: true,
                  label: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!attempt) {
    throw new NotFoundException('Tentative introuvable');
  }

  return attempt;
}





  
}
