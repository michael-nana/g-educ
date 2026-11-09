
import {
  BadRequestException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

import { AuditService } from '../../audit/services/audit.service';
import { AUDIT_ACTIONS } from '../../audit/constants/audit-actions.constants';
import type { UpdateAssessmentDto } from '../dto/update-assessment.dto';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';

import type { CreateAssessmentDto } from '../dto/create-assessment.dto';

@Injectable()
export class AssessmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly teacherScope: TeacherScopeService,
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
    dto.position === undefined
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
      data,
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
        },
        after: {
          title: updated.title,
          instructions: updated.instructions,
          durationSeconds: updated.durationSeconds,
          passingPercent: updated.passingPercent,
          position: updated.position,
          status: updated.status,
        },
      },
      tx,
    );

    return updated;
  });
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


  
}
