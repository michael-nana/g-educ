
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';

import type { CreateSubjectDto } from '../dto/create-subject.dto';
import type { UpdateSubjectDto } from '../dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  private generateSlug(name: string): string {
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private handlePrismaError(error: unknown): never {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error
    ) {
      const code = (error as { code: string }).code;

      if (code === 'P2002') {
        throw new ConflictException(
          'Une matière avec ce nom ou ce slug existe déjà.',
        );
      }

      if (code === 'P2025') {
        throw new NotFoundException('Matière introuvable.');
      }
    }

    throw error;
  }

  async create(dto: CreateSubjectDto) {
    const name = dto.name.trim();

    if (!name) {
      throw new BadRequestException(
        'Le nom de la matière est obligatoire.',
      );
    }

    const slug = this.generateSlug(name);

    if (!slug) {
      throw new BadRequestException(
        'Impossible de générer un slug valide à partir du nom.',
      );
    }

    try {
      return await this.prisma.subject.create({
        data: {
          name,
          slug,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          isActive: true,
          createdAt: true,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: string, dto: UpdateSubjectDto) {
    if (dto.name === undefined && dto.isActive === undefined) {
      throw new BadRequestException(
        'Au moins un champ doit être fourni pour modifier la matière.',
      );
    }

    const data: {
      name?: string;
      slug?: string;
      isActive?: boolean;
    } = {};

    if (dto.name !== undefined) {
      const name = dto.name.trim();

      if (!name) {
        throw new BadRequestException(
          'Le nom de la matière est obligatoire.',
        );
      }

      const slug = this.generateSlug(name);

      if (!slug) {
        throw new BadRequestException(
          'Impossible de générer un slug valide à partir du nom.',
        );
      }

      data.name = name;
      data.slug = slug;
    }

    if (dto.isActive !== undefined) {
      data.isActive = dto.isActive;
    }

    try {
      return await this.prisma.subject.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          slug: true,
          isActive: true,
          createdAt: true,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }
}
