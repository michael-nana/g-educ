import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { AUDIT_ACTIONS } from '../../audit/constants/audit-actions.constants';

import { TeacherScopeService } from './teacher-scope.service';

import type { CreateChapterDto } from '../dto/create-chapter.dto';
import type { UpdateChapterDto } from '../dto/update-chapter.dto';
import type { ReorderChaptersDto } from '../dto/reorder-chapters.dto';

@Injectable()
export class ChaptersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly teacherScope: TeacherScopeService,
  ) {}

  async create(
    user: { id: string; role: string },
    classSubjectId: string,
    dto: CreateChapterDto,
  ) {
    const classSubject = await this.teacherScope.assertCanManage(
      user,
      classSubjectId,
    );

    const title = dto.title.trim();

    if (!title) {
      throw new BadRequestException('Le titre est obligatoire');
    }

    return this.prisma.$transaction(async (tx) => {
      const chapter = await tx.chapter.create({
        data: {
          classSubjectId,
          classId: classSubject.classId,
          title,
          description: dto.description?.trim() || null,
          position: dto.position ?? 0,
          createdById: user.id,
        },
        select: {
          id: true,
          classSubjectId: true,
          classId: true,
          title: true,
          description: true,
          position: true,
          status: true,
          version: true,
          createdById: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.CHAPTER_CREATED,
          entityType: 'Chapter',
          entityId: chapter.id,
          after: {
            title: chapter.title,
            classId: chapter.classId,
            classSubjectId: chapter.classSubjectId,
          },
        },
        tx,
      );

      return chapter;
    });
  }

  async update(
    user: { id: string; role: string },
    chapterId: string,
    dto: UpdateChapterDto,
  ) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      throw new NotFoundException('Chapitre introuvable');
    }

    await this.teacherScope.assertCanManage(
      user,
      chapter.classSubjectId,
    );

    if (
      dto.title === undefined &&
      dto.description === undefined &&
      dto.position === undefined
    ) {
      throw new BadRequestException(
        'Aucune modification fournie',
      );
    }

    const data = {
      ...(dto.title !== undefined && {
        title: dto.title.trim(),
      }),
      ...(dto.description !== undefined && {
        description: dto.description.trim() || null,
      }),
      ...(dto.position !== undefined && {
        position: dto.position,
      }),
      ...(chapter.status === 'PUBLIE' && {
        version: { increment: 1 },
      }),
    };

    if (dto.title !== undefined && !dto.title.trim()) {
      throw new BadRequestException('Le titre est obligatoire');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.chapter.update({
        where: { id: chapterId },
        data,
      });

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.CHAPTER_UPDATED,
          entityType: 'Chapter',
          entityId: chapterId,
          before: {
            title: chapter.title,
            description: chapter.description,
            position: chapter.position,
            version: chapter.version,
          },
          after: {
            title: updated.title,
            description: updated.description,
            position: updated.position,
            version: updated.version,
          },
        },
        tx,
      );

      return updated;
    });
  }

  async publish(
    user: { id: string; role: string; canPublish: boolean },
    chapterId: string,
  ) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      throw new NotFoundException('Chapitre introuvable');
    }

    await this.teacherScope.assertCanManage(
      user,
      chapter.classSubjectId,
    );

    if (
      user.role !== 'ADMINISTRATEUR' &&
      !user.canPublish
    ) {
      throw new BadRequestException(
        'Vous ne disposez pas du droit de publication',
      );
    }

    if (chapter.status === 'PUBLIE') {
      throw new BadRequestException(
        'Ce chapitre est déjà publié',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.chapter.update({
        where: { id: chapterId },
        data: {
          status: 'PUBLIE',
          publishedAt: new Date(),
        },
      });

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.CHAPTER_PUBLISHED,
          entityType: 'Chapter',
          entityId: chapterId,
          before: {
            status: chapter.status,
          },
          after: {
            status: updated.status,
            publishedAt: updated.publishedAt?.toISOString(),
          },
        },
        tx,
      );

      return updated;
    });
  }

  async archive(
    user: { id: string; role: string },
    chapterId: string,
  ) {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      throw new NotFoundException('Chapitre introuvable');
    }

    await this.teacherScope.assertCanManage(
      user,
      chapter.classSubjectId,
    );

    if (chapter.status === 'ARCHIVE') {
      throw new BadRequestException(
        'Ce chapitre est déjà archivé',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.chapter.update({
        where: { id: chapterId },
        data: {
          status: 'ARCHIVE',
        },
      });

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.CHAPTER_ARCHIVED,
          entityType: 'Chapter',
          entityId: chapterId,
          before: {
            status: chapter.status,
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

  async reorder(
    user: { id: string; role: string },
    classSubjectId: string,
    dto: ReorderChaptersDto,
  ) {
    await this.teacherScope.assertCanManage(
      user,
      classSubjectId,
    );

    const chapters = await this.prisma.chapter.findMany({
      where: { classSubjectId },
      select: {
        id: true,
        position: true,
      },
    });

    const requestedIds = dto.chapterIds;

    if (
      chapters.length !== requestedIds.length ||
      chapters.some(
        (chapter) => !requestedIds.includes(chapter.id),
      )
    ) {
      throw new BadRequestException(
        'La liste doit contenir exactement tous les chapitres de cette matière',
      );
    }

    await this.prisma.$transaction(async (tx) => {
      for (const [index, id] of requestedIds.entries()) {
        await tx.chapter.update({
          where: { id },
          data: { position: index },
        });
      }

      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.CHAPTERS_REORDERED,
          entityType: 'ClassSubject',
          entityId: classSubjectId,
          after: {
            chapterIds: requestedIds,
          },
        },
        tx,
      );
    });

    return this.prisma.chapter.findMany({
      where: { classSubjectId },
      orderBy: { position: 'asc' },
      select: {
        id: true,
        title: true,
        position: true,
        status: true,
      },
    });
  }

  async findMyChapters(
    user: { id: string; role: string; classId: string | null },
    classSubjectId?: string,
  ) {
    if (user.role !== 'ELEVE') {
      throw new BadRequestException(
        'Cette fonctionnalité est réservée aux élèves',
      );
    }

    if (!user.classId) {
      throw new NotFoundException(
        'Aucune classe associée à votre profil',
      );
    }

    return this.prisma.chapter.findMany({
      where: {
        classId: user.classId,
        status: 'PUBLIE',
        ...(classSubjectId && { classSubjectId }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        position: true,
        version: true,
        publishedAt: true,
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
      orderBy: [
        { classSubjectId: 'asc' },
        { position: 'asc' },
      ],
    });
  }
}