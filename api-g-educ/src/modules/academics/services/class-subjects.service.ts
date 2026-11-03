
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import type { AssignSubjectDto } from '../dto/assign-subject.dto';

@Injectable()
export class ClassSubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async assign(classId: string, dto: AssignSubjectDto) {
    const schoolClass = await this.prisma.class.findUnique({
      where: { id: classId },
      select: { id: true },
    });

    if (!schoolClass) {
      throw new NotFoundException('Classe introuvable.');
    }

    const subject = await this.prisma.subject.findUnique({
      where: { id: dto.subjectId },
      select: {
        id: true,
        isActive: true,
      },
    });

    if (!subject) {
      throw new NotFoundException('Matière introuvable.');
    }

    if (!subject.isActive) {
      throw new ConflictException(
        'Impossible d’affecter une matière désactivée.',
      );
    }

    try {
      return await this.prisma.classSubject.create({
        data: {
          classId,
          subjectId: dto.subjectId,
          coefficient: dto.coefficient,
          position: dto.position ?? 0,
        },
        select: {
          id: true,
          classId: true,
          subjectId: true,
          coefficient: true,
          position: true,
          createdAt: true,
          subject: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          class: {
            select: {
              id: true,
              code: true,
              label: true,
            },
          },
        },
      });
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as { code: string }).code === 'P2002'
      ) {
        throw new ConflictException(
          'Cette matière est déjà affectée à cette classe.',
        );
      }

      throw error;
    }
  }
}
