
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { randomUUID } from 'crypto';
import sanitizeHtml from 'sanitize-html';
import { fileTypeFromBuffer } from 'file-type';
import { AssetProcessingStatus } from '../../../generated/prisma/client';
import {
  ActivityRefType,
  ActivityType,
  AssetKind,
  ContentStatus,
  LessonType,
} from '../../../generated/prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { AUDIT_ACTIONS } from '../../audit/constants/audit-actions.constants';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';
import { GamificationService } from '../../gamification/services/gamification.service';
import { UploadService } from '../../../common/upload/upload.service';

import type { CreateLessonDto } from '../dto/create-lesson.dto';
import type { UpdateLessonDto } from '../dto/update-lesson.dto';
import type { LessonFilterDto } from '../dto/lesson-filter.dto';
import type { UpdateLessonProgressDto } from '../dto/update-lesson-progress.dto';

type CurrentUser = {
  id: string;
  role: string;
  classId: string | null;
  canPublish: boolean;
};
const MAX_PDF_SIZE = 20 * 1024 * 1024;

@Injectable()
export class LessonsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly gamificationService: GamificationService,
    private readonly uploadService: UploadService,
    private readonly teacherScopeService: TeacherScopeService,
  ) {}

  private sanitizeMarkdown(value: string): string {
    return sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
      disallowedTagsMode: 'discard',
    }).trim();
  }

  private async findLessonOrFail(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        chapter: true,
      },
    });

    if (!lesson) {
      throw new NotFoundException('Leçon introuvable');
    }

    return lesson;
  }

  private async assertLessonAccess(
    user: CurrentUser,
    lessonId: string,
  ) {
    const lesson = await this.findLessonOrFail(lessonId);

    if (user.role === 'ELEVE') {
      if (
        !user.classId ||
        lesson.classId !== user.classId ||
        lesson.status !== ContentStatus.PUBLIE ||
        lesson.chapter.status !== ContentStatus.PUBLIE
      ) {
        throw new NotFoundException('Leçon introuvable');
      }

      return lesson;
    }

    if (
      user.role === 'ADMINISTRATEUR' ||
      user.role === 'ENSEIGNANT'
    ) {
      await this.teacherScopeService.assertCanManage(
        user,
        lesson.chapter.classSubjectId,
      );

      return lesson;
    }

    throw new ForbiddenException(
      'Accès interdit à cette leçon',
    );
  }

  // --------------------------------------------------
  // CRÉATION
  // --------------------------------------------------

  async create(
    user: CurrentUser,
    chapterId: string,
    dto: CreateLessonDto,
  ) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      throw new NotFoundException('Chapitre introuvable');
    }

    await this.teacherScopeService.assertCanManage(
      user,
      chapter.classSubjectId,
    );

    if (!dto.title.trim()) {
      throw new BadRequestException(
        'Le titre est obligatoire',
      );
    }

    if (dto.type === LessonType.TEXTE) {
      if (!dto.contentMarkdown?.trim()) {
        throw new BadRequestException(
          'Le contenu Markdown est obligatoire pour une leçon texte',
        );
      }
    }

    if (dto.type === LessonType.VIDEO) {
      throw new BadRequestException(
        'Les vidéos seront disponibles dans la phase 2',
      );
    }

    const contentMarkdown =
      dto.type === LessonType.TEXTE
        ? this.sanitizeMarkdown(dto.contentMarkdown!)
        : null;

    return this.prisma.$transaction(async (tx) => {
      const lesson = await tx.lesson.create({
        data: {
          chapterId,
          classId: chapter.classId,
          title: dto.title.trim(),
          type: dto.type,
          contentMarkdown,
          durationSeconds: null,
          position: dto.position ?? 0,
          status: ContentStatus.BROUILLON,
          createdById: user.id,
        },
      });

      await this.auditService.log(
        {
          action: 'LESSON_CREATED',
          entityType: 'Lesson',
          entityId: lesson.id,
          after: {
            title: lesson.title,
            type: lesson.type,
            classId: lesson.classId,
            chapterId: lesson.chapterId,
          },
        },
        tx,
      );

      return lesson;
    });
  }

  // --------------------------------------------------
  // MODIFICATION
  // --------------------------------------------------

  async update(
    user: CurrentUser,
    lessonId: string,
    dto: UpdateLessonDto,
  ) {
    const lesson = await this.findLessonOrFail(lessonId);

    await this.teacherScopeService.assertCanManage(
      user,
      lesson.chapter.classSubjectId,
    );

    if (lesson.status === ContentStatus.ARCHIVE) {
      throw new BadRequestException(
        'Une leçon archivée ne peut pas être modifiée',
      );
    }

    if (
      dto.title === undefined &&
      dto.contentMarkdown === undefined &&
      dto.position === undefined &&
      dto.durationSeconds === undefined
    ) {
      throw new BadRequestException(
        'Aucune modification fournie',
      );
    }

    if (dto.title !== undefined && !dto.title.trim()) {
      throw new BadRequestException(
        'Le titre est obligatoire',
      );
    }

    if (
      lesson.type === LessonType.TEXTE &&
      dto.contentMarkdown !== undefined &&
      !dto.contentMarkdown.trim()
    ) {
      throw new BadRequestException(
        'Le contenu Markdown est obligatoire',
      );
    }

    const data = {
      ...(dto.title !== undefined && {
        title: dto.title.trim(),
      }),
      ...(dto.contentMarkdown !== undefined && {
        contentMarkdown: this.sanitizeMarkdown(
          dto.contentMarkdown,
        ),
      }),
      ...(dto.position !== undefined && {
        position: dto.position,
      }),
      ...(dto.durationSeconds !== undefined && {
        durationSeconds: dto.durationSeconds,
      }),
      ...(lesson.status === ContentStatus.PUBLIE && {
        version: { increment: 1 },
      }),
    };

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.lesson.update({
        where: { id: lessonId },
        data,
      });

      await this.auditService.log(
        {
          action: 'LESSON_UPDATED',
          entityType: 'Lesson',
          entityId: lessonId,
          before: {
            title: lesson.title,
            contentMarkdown: lesson.contentMarkdown,
            position: lesson.position,
            version: lesson.version,
          },
          after: {
            title: updated.title,
            contentMarkdown: updated.contentMarkdown,
            position: updated.position,
            version: updated.version,
          },
        },
        tx,
      );

      return updated;
    });
  }

  async uploadPdfAsset(
  user: CurrentUser,
  lessonId: string,
  file: Express.Multer.File,
) {
  if (!file) {
    throw new BadRequestException('Aucun fichier fourni.');
  }

  if (!file.buffer || file.buffer.length === 0) {
    throw new BadRequestException('Le fichier est vide ou invalide.');
  }

  if (file.size > MAX_PDF_SIZE) {
    throw new BadRequestException(
      'Le fichier PDF ne doit pas dépasser 20 Mo.',
    );
  }

  // Vérification du contenu réel du fichier, et non de son extension.
  const fileType = await fileTypeFromBuffer(file.buffer);

  if (fileType?.mime !== 'application/pdf') {
    throw new BadRequestException(
      'Le fichier fourni n’est pas un véritable PDF.',
    );
  }

  const lesson = await this.findLessonOrFail(lessonId);

  await this.teacherScopeService.assertCanManage(
    user,
    lesson.chapter.classSubjectId,
  );

  if (lesson.type !== LessonType.PDF) {
    throw new BadRequestException(
      'Les fichiers PDF ne peuvent être ajoutés qu’aux leçons de type PDF.',
    );
  }

  if (lesson.status === ContentStatus.ARCHIVE) {
    throw new BadRequestException(
      'Impossible de modifier une leçon archivée.',
    );
  }

  const storageKey =
    `pdf/${lesson.classId}/${randomUUID()}.pdf`;

  // 1. Upload dans Backblaze B2.
  await this.uploadService.uploadFile({
    storageKey,
    buffer: file.buffer,
    mimeType: 'application/pdf',
  });

  try {
    // 2. Enregistrement en base et journalisation.
    return await this.prisma.$transaction(async (tx) => {
      const asset = await tx.lessonAsset.create({
        data: {
          lessonId: lesson.id,
          kind: AssetKind.PDF,
          storageKey,
          mimeType: 'application/pdf',
          sizeBytes: file.buffer.length,
          processingStatus: AssetProcessingStatus.PRET,
        },
      });

      if (lesson.status === ContentStatus.PUBLIE) {
        await tx.lesson.update({
          where: { id: lesson.id },
          data: { version: { increment: 1 } },
        });
      }

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.ASSET_UPLOADED,
          entityType: 'LESSON_ASSET',
          entityId: asset.id,
          after: {
            lessonId: lesson.id,
            kind: AssetKind.PDF,
            sizeBytes: asset.sizeBytes,
          },
        },
        tx,
      );

      return asset;
    });
  } catch (error) {
    // 3. Si l'enregistrement échoue, on supprime l'objet B2.
    try {
      await this.uploadService.deleteFile(storageKey);
    } catch {
      // Ne pas masquer l'erreur initiale de la transaction.
    }

    throw error;
  }
}

async deleteAsset(
  user: CurrentUser,
  lessonId: string,
  assetId: string,
) {
  const lesson = await this.findLessonOrFail(lessonId);

  await this.teacherScopeService.assertCanManage(
    user,
    lesson.chapter.classSubjectId,
  );

  if (lesson.status === ContentStatus.ARCHIVE) {
    throw new BadRequestException(
      'Impossible de modifier une leçon archivée.',
    );
  }

  // Les assets d'une leçon publiée ne sont pas supprimés physiquement.
  if (lesson.status === ContentStatus.PUBLIE) {
    throw new BadRequestException(
      'Une ressource publiée ne peut pas être supprimée. Ajoutez une nouvelle ressource pour la remplacer.',
    );
  }

  const asset = await this.prisma.lessonAsset.findFirst({
    where: {
      id: assetId,
      lessonId: lesson.id,
    },
  });

  if (!asset) {
    throw new NotFoundException('Ressource introuvable.');
  }

  // Suppression de l'objet distant avant la suppression en base.
  await this.uploadService.deleteFile(asset.storageKey);

  return this.prisma.$transaction(async (tx) => {
    await tx.lessonAsset.delete({
      where: { id: asset.id },
    });

    await this.auditService.log(
      {
        action: AUDIT_ACTIONS.ASSET_DELETED,
        entityType: 'LESSON_ASSET',
        entityId: asset.id,
        before: {
          lessonId: lesson.id,
          kind: asset.kind,
          sizeBytes: asset.sizeBytes,
        },
      },
      tx,
    );

    return {
      message: 'Ressource supprimée avec succès.',
    };
  });
}

  // --------------------------------------------------
  // PUBLICATION
  // --------------------------------------------------

  async publish(
    user: CurrentUser,
    lessonId: string,
  ) {
    const lesson = await this.findLessonOrFail(lessonId);

    await this.teacherScopeService.assertCanManage(
      user,
      lesson.chapter.classSubjectId,
    );

    if (
      user.role !== 'ADMINISTRATEUR' &&
      !user.canPublish
    ) {
      throw new ForbiddenException(
        'Vous ne disposez pas du droit de publication',
      );
    }

    if (lesson.status === ContentStatus.PUBLIE) {
      throw new BadRequestException(
        'Cette leçon est déjà publiée',
      );
    }

    if (lesson.status === ContentStatus.ARCHIVE) {
      throw new BadRequestException(
        'Une leçon archivée ne peut pas être publiée',
      );
    }

    if (lesson.chapter.status !== ContentStatus.PUBLIE) {
      throw new BadRequestException(
        'Le chapitre doit être publié avant la leçon',
      );
    }

    if (
      lesson.type === LessonType.TEXTE &&
      !lesson.contentMarkdown?.trim()
    ) {
      throw new BadRequestException(
        'Le contenu de la leçon est vide',
      );
    }

    if (lesson.type === LessonType.PDF) {
      const pdf = await this.prisma.lessonAsset.findFirst({
        where: {
          lessonId,
          kind: AssetKind.PDF,
          processingStatus: 'PRET',
        },
      });

      if (!pdf) {
        throw new BadRequestException(
          'Un fichier PDF valide est obligatoire pour publier cette leçon',
        );
      }
    }

    if (lesson.type === LessonType.VIDEO) {
      throw new BadRequestException(
        'La publication des vidéos sera activée en phase 2',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.lesson.update({
        where: { id: lessonId },
        data: {
          status: ContentStatus.PUBLIE,
          publishedAt: new Date(),
          publishedById: user.id,
        },
      });

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.LESSON_PUBLISHED,
          entityType: 'Lesson',
          entityId: lessonId,
          before: {
            status: lesson.status,
          },
          after: {
            status: updated.status,
            publishedAt: updated.publishedAt?.toISOString(),
            publishedById: updated.publishedById,
          },
        },
        tx,
      );

      return updated;
    });
  }

  // --------------------------------------------------
  // ARCHIVAGE
  // --------------------------------------------------

  async archive(
    user: CurrentUser,
    lessonId: string,
  ) {
    const lesson = await this.findLessonOrFail(lessonId);

    await this.teacherScopeService.assertCanManage(
      user,
      lesson.chapter.classSubjectId,
    );

    if (lesson.status === ContentStatus.ARCHIVE) {
      throw new BadRequestException(
        'Cette leçon est déjà archivée',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.lesson.update({
        where: { id: lessonId },
        data: {
          status: ContentStatus.ARCHIVE,
        },
      });

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.LESSON_ARCHIVED,
          entityType: 'Lesson',
          entityId: lessonId,
          before: {
            status: lesson.status,
          },
          after: {
            status: updated.status,
          },
        },
        tx,
      );

      return updated;
    });
  }

  // --------------------------------------------------
  // LISTE DES LEÇONS
  // --------------------------------------------------

  async findAll(
    user: CurrentUser,
    filters: LessonFilterDto,
  ) {
    const where: any = {
      ...(filters.chapterId && {
        chapterId: filters.chapterId,
      }),
      ...(filters.classSubjectId && {
        chapter: {
          classSubjectId: filters.classSubjectId,
        },
      }),
      ...(filters.type && {
        type: filters.type,
      }),
    };

    if (user.role === 'ELEVE') {
      if (!user.classId) {
        throw new NotFoundException(
          'Aucune classe associée à votre profil',
        );
      }

      where.classId = user.classId;
      where.status = ContentStatus.PUBLIE;
      where.chapter = {
        ...where.chapter,
        status: ContentStatus.PUBLIE,
      };
    } else if (user.role === 'ENSEIGNANT') {
      where.chapter = {
        ...where.chapter,
        classSubject: {
          teachers: {
            some: {
              userId: user.id,
            },
          },
        },
      };
    } else if (user.role !== 'ADMINISTRATEUR') {
      throw new ForbiddenException();
    }

    if (filters.favorite === 'true') {
      where.favorites = {
        some: {
          userId: user.id,
        },
      };
    } else if (filters.favorite === 'false') {
      where.favorites = {
        none: {
          userId: user.id,
        },
      };
    }

    return this.prisma.lesson.findMany({
      where,
      orderBy: [
        { chapterId: 'asc' },
        { position: 'asc' },
      ],
      select: {
        id: true,
        chapterId: true,
        classId: true,
        title: true,
        type: true,
        position: true,
        status: true,
        version: true,
        durationSeconds: true,
        publishedAt: true,
        createdAt: true,
        chapter: {
          select: {
            id: true,
            title: true,
            status: true,
            classSubjectId: true,
          },
        },
        _count: {
          select: {
            assets: true,
          },
        },
      },
    });
  }

  // --------------------------------------------------
  // DÉTAIL ET LIENS SIGNÉS
  // --------------------------------------------------

  async findOne(
    user: CurrentUser,
    lessonId: string,
  ) {
    const lesson = await this.assertLessonAccess(
      user,
      lessonId,
    );

    const assets = await this.prisma.lessonAsset.findMany({
      where: {
        lessonId,
        processingStatus: 'PRET',
      },
      select: {
        id: true,
        kind: true,
        mimeType: true,
        sizeBytes: true,
        durationSeconds: true,
        storageKey: true,
        createdAt: true,
      },
    });

    const assetsWithLinks = await Promise.all(
      assets.map(async (asset) => ({
        id: asset.id,
        kind: asset.kind,
        mimeType: asset.mimeType,
        sizeBytes: asset.sizeBytes,
        durationSeconds: asset.durationSeconds,
        createdAt: asset.createdAt,
        downloadUrl:
          await this.uploadService.createSignedDownloadUrl(
            asset.storageKey,
            300,
          ),
      })),
    );

    const progress =
      user.role === 'ELEVE'
        ? await this.prisma.lessonProgress.findUnique({
            where: {
              userId_lessonId: {
                userId: user.id,
                lessonId,
              },
            },
          })
        : null;

    return {
      id: lesson.id,
      chapterId: lesson.chapterId,
      title: lesson.title,
      type: lesson.type,
      contentMarkdown: lesson.contentMarkdown,
      durationSeconds: lesson.durationSeconds,
      position: lesson.position,
      status: lesson.status,
      version: lesson.version,
      publishedAt: lesson.publishedAt,
      assets: assetsWithLinks,
      myProgress: progress,
    };
  }

  // --------------------------------------------------
  // FAVORIS
  // --------------------------------------------------

  async addFavorite(
    user: CurrentUser,
    lessonId: string,
  ) {
    if (user.role !== 'ELEVE') {
      throw new ForbiddenException(
        'Cette fonctionnalité est réservée aux élèves',
      );
    }

    await this.assertLessonAccess(user, lessonId);

    await this.prisma.lessonFavorite.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
      create: {
        userId: user.id,
        lessonId,
      },
      update: {},
    });

    return {
      lessonId,
      favorite: true,
    };
  }

  async removeFavorite(
    user: CurrentUser,
    lessonId: string,
  ) {
    if (user.role !== 'ELEVE') {
      throw new ForbiddenException(
        'Cette fonctionnalité est réservée aux élèves',
      );
    }

    await this.assertLessonAccess(user, lessonId);

    await this.prisma.lessonFavorite.deleteMany({
      where: {
        userId: user.id,
        lessonId,
      },
    });

    return {
      lessonId,
      favorite: false,
    };
  }

  // --------------------------------------------------
  // PROGRESSION
  // --------------------------------------------------

  async updateProgress(
    user: CurrentUser,
    lessonId: string,
    dto: UpdateLessonProgressDto,
  ) {
    if (user.role !== 'ELEVE') {
      throw new ForbiddenException(
        'Cette fonctionnalité est réservée aux élèves',
      );
    }

    const lesson = await this.assertLessonAccess(
      user,
      lessonId,
    );

    if (
      lesson.type === LessonType.PDF &&
      dto.lastPositionSeconds !== undefined
    ) {
      throw new BadRequestException(
        'La position de lecture est réservée aux vidéos',
      );
    }

    if (
      lesson.type === LessonType.VIDEO &&
      dto.lastPositionSeconds !== undefined &&
      lesson.durationSeconds !== null &&
      dto.lastPositionSeconds > lesson.durationSeconds
    ) {
      throw new BadRequestException(
        'Position vidéo invalide',
      );
    }

    const now = new Date();

    const result = await this.prisma.$transaction(
      async (tx) => {
        const existing = await tx.lessonProgress.findUnique({
          where: {
            userId_lessonId: {
              userId: user.id,
              lessonId,
            },
          },
        });

        const progressPercent = Math.max(
          existing?.progressPercent ?? 0,
          dto.progressPercent,
        );

        const isComplete =
          lesson.type === LessonType.TEXTE
            ? progressPercent >= 100
            : lesson.type === LessonType.VIDEO &&
              progressPercent >= 80;

        const newlyCompleted =
          isComplete && !existing?.completedAt;

        const progress = await tx.lessonProgress.upsert({
          where: {
            userId_lessonId: {
              userId: user.id,
              lessonId,
            },
          },
          create: {
            userId: user.id,
            lessonId,
            progressPercent,
            lastPositionSeconds:
              dto.lastPositionSeconds ?? null,
            completedAt: isComplete ? now : null,
          },
          update: {
            progressPercent,
            ...(dto.lastPositionSeconds !== undefined && {
              lastPositionSeconds: dto.lastPositionSeconds,
            }),
            ...(newlyCompleted && {
              completedAt: now,
            }),
          },
        });

        let activityResult: Awaited<
  ReturnType<GamificationService['recordActivity']>
> | null = null;

        if (newlyCompleted) {
          activityResult = await this.gamificationService.recordActivity(
            tx,
            {
              userId: user.id,
              clientId: dto.clientId,
              type: ActivityType.LECON_TERMINEE,
              refType: ActivityRefType.LESSON,
              refId: lessonId,
              occurredAt: now,
            },
          );
        }

        const streak = await tx.userStreak.findUnique({
          where: { userId: user.id },
        });

        return {
          progress,
          newlyCompleted,
          activity: activityResult,
          streak,
        };
      },
    );

    return {
      progress: result.progress,
      completed: result.progress.completedAt !== null,
      newlyCompleted: result.newlyCompleted,
      activity: result.activity,
      streak: result.streak
        ? {
            currentStreak: result.streak.currentStreak,
            longestStreak: result.streak.longestStreak,
            lastActiveDate: result.streak.lastActiveDate,
          }
        : {
            currentStreak: 0,
            longestStreak: 0,
            lastActiveDate: null,
          },
    };
  }

  // --------------------------------------------------
  // REPRISE DE LECTURE
  // --------------------------------------------------

  async findMyProgress(user: CurrentUser) {
    if (user.role !== 'ELEVE') {
      throw new ForbiddenException(
        'Cette fonctionnalité est réservée aux élèves',
      );
    }

    if (!user.classId) {
      throw new NotFoundException(
        'Aucune classe associée à votre profil',
      );
    }

    return this.prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        lesson: {
          classId: user.classId,
          status: ContentStatus.PUBLIE,
          chapter: {
            status: ContentStatus.PUBLIE,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        progressPercent: true,
        lastPositionSeconds: true,
        completedAt: true,
        updatedAt: true,
        lesson: {
          select: {
            id: true,
            title: true,
            type: true,
            durationSeconds: true,
            version: true,
            chapter: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });
  }
}
