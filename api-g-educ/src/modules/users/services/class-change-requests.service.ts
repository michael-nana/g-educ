import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  RequestStatus,
  Role,
} from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { CreateClassChangeRequestDto } from '../dto/create-class-change-request.dto';
import { ReviewClassChangeRequestDto } from '../dto/review-class-change-request.dto';

@Injectable()
export class ClassChangeRequestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async create(
    user: AuthenticatedUser,
    dto: CreateClassChangeRequestDto,
  ) {
    if (user.role !== Role.ELEVE) {
      throw new BadRequestException(
        'Seul un élève peut demander un changement de classe.',
      );
    }

    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        classId: true,
        academicYearId: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profil élève introuvable.');
    }

    if (profile.classId === dto.toClassId) {
      throw new BadRequestException(
        'La classe cible est déjà votre classe actuelle.',
      );
    }

    const targetClass = await this.prisma.class.findUnique({
      where: { id: dto.toClassId },
      select: { id: true },
    });

    if (!targetClass) {
      throw new NotFoundException('Classe cible introuvable.');
    }

    const currentYear = await this.prisma.academicYear.findFirst({
      where: { isCurrent: true },
      select: { id: true },
    });

    if (!currentYear) {
      throw new BadRequestException(
        'Aucune année scolaire courante n’est configurée.',
      );
    }

    const pending = await this.prisma.classChangeRequest.findFirst({
      where: {
        studentProfileId: profile.id,
        status: RequestStatus.EN_ATTENTE,
      },
      select: { id: true },
    });

    if (pending) {
      throw new BadRequestException(
        'Vous avez déjà une demande de changement de classe en attente.',
      );
    }

    const request = await this.prisma.classChangeRequest.create({
      data: {
        studentProfileId: profile.id,
        academicYearId: currentYear.id,
        fromClassId: profile.classId,
        toClassId: dto.toClassId,
        note: dto.note,
      },
      select: {
        id: true,
        academicYearId: true,
        fromClassId: true,
        toClassId: true,
        status: true,
        note: true,
        createdAt: true,
      },
    });

    await this.audit.log({
      action: 'CLASS_CHANGE_REQUEST_CREATED',
      entityType: 'ClassChangeRequest',
      entityId: request.id,
      after: request,
    });

    return request;
  }

  async list() {
    return this.prisma.classChangeRequest.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        studentProfileId: true,
        academicYearId: true,
        fromClassId: true,
        toClassId: true,
        status: true,
        note: true,
        reviewedById: true,
        reviewedAt: true,
        createdAt: true,
      },
    });
  }

  async approve(
    admin: AuthenticatedUser,
    id: string,
    dto: ReviewClassChangeRequestDto,
  ) {
    return this.review(admin, id, RequestStatus.APPROUVEE, dto);
  }

  async reject(
    admin: AuthenticatedUser,
    id: string,
    dto: ReviewClassChangeRequestDto,
  ) {
    return this.review(admin, id, RequestStatus.REFUSEE, dto);
  }

  private async review(
    admin: AuthenticatedUser,
    id: string,
    status: RequestStatus,
    dto: ReviewClassChangeRequestDto,
  ) {
    const request = await this.prisma.classChangeRequest.findUnique({
      where: { id },
      select: {
        id: true,
        studentProfileId: true,
        academicYearId: true,
        fromClassId: true,
        toClassId: true,
        status: true,
      },
    });

    if (!request) {
      throw new NotFoundException('Demande introuvable.');
    }

    if (request.status !== RequestStatus.EN_ATTENTE) {
      throw new BadRequestException(
        'Cette demande a déjà été traitée.',
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      if (status === RequestStatus.APPROUVEE) {
        await tx.studentProfile.update({
          where: { id: request.studentProfileId },
          data: {
            classId: request.toClassId,
            academicYearId: request.academicYearId,
          },
        });

        await tx.classEnrollment.upsert({
          where: {
            studentProfileId_academicYearId: {
              studentProfileId: request.studentProfileId,
              academicYearId: request.academicYearId,
            },
          },
          create: {
            studentProfileId: request.studentProfileId,
            academicYearId: request.academicYearId,
            classId: request.toClassId,
          },
          update: {
            classId: request.toClassId,
          },
        });
      }

      const updated = await tx.classChangeRequest.update({
        where: { id },
        data: {
          status,
          reviewedById: admin.id,
          reviewedAt: new Date(),
          ...(dto.note !== undefined && { note: dto.note }),
        },
        select: {
          id: true,
          status: true,
          reviewedById: true,
          reviewedAt: true,
          note: true,
        },
      });

      await this.audit.log(
        {
          action:
            status === RequestStatus.APPROUVEE
              ? 'CLASS_CHANGE_REQUEST_APPROVED'
              : 'CLASS_CHANGE_REQUEST_REJECTED',
          entityType: 'ClassChangeRequest',
          entityId: id,
          before: { status: request.status },
          after: updated,
        },
        tx,
      );

      if (status === RequestStatus.APPROUVEE) {
        await this.audit.log(
          {
            action: 'CLASS_CHANGED',
            entityType: 'StudentProfile',
            entityId: request.studentProfileId,
            before: { classId: request.fromClassId },
            after: { classId: request.toClassId },
          },
          tx,
        );
      }

      return updated;
    });

    return result;
  }
}