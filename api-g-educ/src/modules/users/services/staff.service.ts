import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Role } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { APP_CONFIG } from '../../../common/config/app.constants';
import { CreateStaffDto } from '../dto/create-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async create(dto: CreateStaffDto) {
if (
  dto.role !== Role.ENSEIGNANT &&
  dto.role !== Role.MODERATEUR
) {
  throw new BadRequestException(
    'Seuls les rôles ENSEIGNANT et MODERATEUR peuvent être créés ici.',
  );
}

    if (dto.role === Role.MODERATEUR && dto.classSubjectIds?.length) {
      throw new BadRequestException(
        'Un modérateur ne peut pas recevoir d’affectations pédagogiques.',
      );
    }

    if (dto.role === Role.ENSEIGNANT && !dto.classSubjectIds?.length) {
      throw new BadRequestException(
        'Un enseignant doit avoir au moins une matière affectée.',
      );
    }

    const existing = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
      select: { id: true },
    });

    if (existing) {
      throw new BadRequestException(
        'Un compte utilise déjà ce numéro de téléphone.',
      );
    }

    const classSubjectIds = dto.classSubjectIds ?? [];

    if (classSubjectIds.length) {
      const subjects = await this.prisma.classSubject.findMany({
        where: { id: { in: classSubjectIds } },
        select: { id: true },
      });

      if (subjects.length !== classSubjectIds.length) {
        throw new BadRequestException(
          'Une ou plusieurs matières de classe sont introuvables.',
        );
      }
    }

    const temporaryPassword = randomBytes(12).toString('base64url');
    const passwordHash = await bcrypt.hash(
      temporaryPassword,
      APP_CONFIG.password.bcryptRounds,
    );

    const account = await this.prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          phone: dto.phone,
          passwordHash,
          role: dto.role,
          status: 'ACTIF',
          canPublish: dto.role === Role.ENSEIGNANT
            ? (dto.canPublish ?? false)
            : false,
          mustChangePassword: true,
        },
        select: {
          id: true,
          phone: true,
          role: true,
          status: true,
          canPublish: true,
          mustChangePassword: true,
          createdAt: true,
        },
      });

      if (dto.role === Role.ENSEIGNANT && classSubjectIds.length) {
        await tx.teacherAssignment.createMany({
          data: classSubjectIds.map((classSubjectId) => ({
            userId: created.id,
            classSubjectId,
          })),
        });
      }

      await this.audit.log(
        {
          action: 'STAFF_CREATED',
          entityType: 'User',
          entityId: created.id,
          after: {
            phone: created.phone,
            role: created.role,
            canPublish: created.canPublish,
            classSubjectIds,
          },
        },
        tx,
      );

      return created;
    });

    // Le mot de passe temporaire n'est retourné qu'à cette création.
    return {
      user: account,
      temporaryPassword,
      message:
        'Personnel créé. Communiquez le mot de passe temporaire à son titulaire.',
    };
  }
}