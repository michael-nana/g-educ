import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { AUDIT_ACTIONS } from '../../audit/constants/audit-actions.constants';

import type { CreateAcademicYearDto } from '../dto/create-academic-year.dto';

@Injectable()
export class AcademicYearsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async findCurrent() {
    const academicYear = await this.prisma.academicYear.findFirst({
      where: {
        isCurrent: true,
      },
      select: {
        id: true,
        label: true,
        startDate: true,
        endDate: true,
        isCurrent: true,
        createdAt: true,
      },
    });

    if (!academicYear) {
      throw new NotFoundException(
        'Aucune année scolaire courante n’est définie.',
      );
    }

    return academicYear;
  }

  async create(dto: CreateAcademicYearDto) {
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      startDate >= endDate
    ) {
      throw new BadRequestException(
        'La date de début doit être antérieure à la date de fin.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // Désactiver l'année scolaire actuellement courante.
      await tx.academicYear.updateMany({
        where: {
          isCurrent: true,
        },
        data: {
          isCurrent: false,
        },
      });

      // Créer la nouvelle année comme année courante.
      const academicYear = await tx.academicYear.create({
        data: {
          label: dto.label.trim(),
          startDate,
          endDate,
          isCurrent: true,
        },
        select: {
          id: true,
          label: true,
          startDate: true,
          endDate: true,
          isCurrent: true,
          createdAt: true,
        },
      });

      // Enregistrer l'action dans la même transaction.
      await this.auditService.log(
        {
          action: AUDIT_ACTIONS.ACADEMIC_YEAR_CREATED,
          entityType: 'AcademicYear',
          entityId: academicYear.id,
          after: {
            label: academicYear.label,
            startDate: academicYear.startDate.toISOString(),
            endDate: academicYear.endDate.toISOString(),
            isCurrent: academicYear.isCurrent,
          },
        },
        tx,
      );

      return academicYear;
    });
  }
}