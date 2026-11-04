import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role, UserStatus } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { AuthService } from '../../auth/services/auth.service';
import { UpdateMyProfileDto } from '../dto/update-my-profile.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ListUsersDto } from '../dto/list-users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly authService: AuthService,
  ) {}

  async getMe(user: AuthenticatedUser) {
const account = await this.prisma.user.findFirst({
  where: {
    id: user.id,
    anonymizedAt: null,
  },
      select: {
        id: true,
        phone: true,
        role: true,
        status: true,
        canPublish: true,
        mustChangePassword: true,
        phoneVerifiedAt: true,
        lastLoginAt: true,
        createdAt: true,
        studentProfile: {
          select: {
            id: true,
            displayName: true,
            schoolName: true,
            classId: true,
            academicYearId: true,
          },
        },
      },
    });

    if (!account ) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    return account;
  }

  async updateMyProfile(
    user: AuthenticatedUser,
    dto: UpdateMyProfileDto,
  ) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        displayName: true,
        schoolName: true,
      },
    });

    if (!profile) {
      throw new BadRequestException(
        'Aucun profil élève associé à ce compte.',
      );
    }

    const updated = await this.prisma.studentProfile.update({
      where: { id: profile.id },
      data: {
        ...(dto.displayName !== undefined && {
          displayName: dto.displayName.trim(),
        }),
        ...(dto.schoolName !== undefined && {
          schoolName: dto.schoolName?.trim() || null,
        }),
      },
      select: {
        id: true,
        displayName: true,
        schoolName: true,
        classId: true,
        academicYearId: true,
        updatedAt: true,
      },
    });

    await this.audit.log({
      action: 'USER_PROFILE_UPDATED',
      entityType: 'StudentProfile',
      entityId: profile.id,
      before: profile,
      after: updated,
    });

    return updated;
  }

  async changePassword(
    user: AuthenticatedUser,
    dto: { currentPassword: string; newPassword: string },
  ) {
    const result = await this.authService.changePassword(user.id, dto);

    await this.audit.log({
      action: 'USER_PASSWORD_CHANGED',
      entityType: 'User',
      entityId: user.id,
    });

    return result;
  }

  async list(dto: ListUsersDto) {
    const page = Math.max(1, Number(dto.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(dto.limit ?? 20)));
    const skip = (page - 1) * limit;

    const where = {
      anonymizedAt: null,
      ...(dto.role && { role: dto.role }),
      ...(dto.status && { status: dto.status }),
      ...(dto.search && {
        OR: [
          { phone: { contains: dto.search } },
          {
            studentProfile: {
              is: {
                displayName: { contains: dto.search, mode: 'insensitive' as const },
              },
            },
          },
        ],
      }),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          phone: true,
          role: true,
          status: true,
          canPublish: true,
          mustChangePassword: true,
          lastLoginAt: true,
          createdAt: true,
          studentProfile: {
            select: {
              displayName: true,
              classId: true,
              schoolName: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const account = await this.prisma.user.findFirst({
      where: { id, anonymizedAt: null },
      select: {
        id: true,
        phone: true,
        role: true,
        status: true,
        canPublish: true,
        mustChangePassword: true,
        phoneVerifiedAt: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        studentProfile: {
          select: {
            id: true,
            displayName: true,
            schoolName: true,
            classId: true,
            academicYearId: true,
          },
        },
        teacherAssignments: {
          select: {
            id: true,
            classSubjectId: true,
          },
        },
      },
    });

    if (!account) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    return account;
  }

  async updateUser(
    admin: AuthenticatedUser,
    id: string,
    dto: UpdateUserDto,
  ) {
    const target = await this.prisma.user.findFirst({
      where: { id, anonymizedAt: null },
      select: {
        id: true,
        role: true,
        canPublish: true,
        status: true,
      },
    });

    if (!target) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    if (admin.id === id && dto.role && dto.role !== Role.ADMINISTRATEUR) {
      throw new ForbiddenException(
        'Vous ne pouvez pas modifier votre propre rôle.',
      );
    }

    if (
      target.role === Role.ADMINISTRATEUR &&
      dto.role &&
      dto.role !== Role.ADMINISTRATEUR
    ) {
      await this.assertNotLastActiveAdmin(id);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.role !== undefined && { role: dto.role }),
        ...(dto.canPublish !== undefined && {
          canPublish: dto.canPublish,
        }),
      },
      select: {
        id: true,
        phone: true,
        role: true,
        canPublish: true,
        status: true,
      },
    });

    if (dto.role !== undefined && dto.role !== target.role) {
      await this.audit.log({
        action: 'ROLE_CHANGED',
        entityType: 'User',
        entityId: id,
        before: { role: target.role },
        after: { role: updated.role },
      });
    }

    if (
      dto.canPublish !== undefined &&
      dto.canPublish !== target.canPublish
    ) {
      await this.audit.log({
        action: 'USER_PUBLISH_PERMISSION_CHANGED',
        entityType: 'User',
        entityId: id,
        before: { canPublish: target.canPublish },
        after: { canPublish: updated.canPublish },
      });
    }

    return updated;
  }

  async suspend(admin: AuthenticatedUser, id: string) {
    if (admin.id === id) {
      throw new ForbiddenException(
        'Vous ne pouvez pas suspendre votre propre compte.',
      );
    }

    const target = await this.prisma.user.findFirst({
      where: { id, anonymizedAt: null },
      select: { id: true, role: true, status: true },
    });

    if (!target) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    if (target.status === UserStatus.SUSPENDU) {
      throw new BadRequestException('Ce compte est déjà suspendu.');
    }

    if (target.role === Role.ADMINISTRATEUR) {
      await this.assertNotLastActiveAdmin(id);
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const account = await tx.user.update({
        where: { id },
        data: { status: UserStatus.SUSPENDU },
        select: { id: true, status: true, role: true },
      });

      await tx.refreshToken.updateMany({
        where: { userId: id, revokedAt: null },
        data: { revokedAt: new Date() },
      });

      await this.audit.log(
        {
          action: 'USER_SUSPENDED',
          entityType: 'User',
          entityId: id,
          before: { status: target.status },
          after: { status: account.status },
        },
        tx,
      );

      return account;
    });

    return updated;
  }

  async reactivate(_admin: AuthenticatedUser, id: string) {
    const target = await this.prisma.user.findFirst({
      where: { id, anonymizedAt: null },
      select: { id: true, status: true },
    });

    if (!target) {
      throw new NotFoundException('Utilisateur introuvable.');
    }

    if (target.status === UserStatus.ACTIF) {
      throw new BadRequestException('Ce compte est déjà actif.');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { status: UserStatus.ACTIF },
      select: { id: true, status: true },
    });

    await this.audit.log({
      action: 'USER_REACTIVATED',
      entityType: 'User',
      entityId: id,
      before: { status: target.status },
      after: { status: updated.status },
    });

    return updated;
  }

  private async assertNotLastActiveAdmin(excludedId: string) {
    const count = await this.prisma.user.count({
      where: {
        role: Role.ADMINISTRATEUR,
        status: UserStatus.ACTIF,
        anonymizedAt: null,
        id: { not: excludedId },
      },
    });

    if (count === 0) {
      throw new ForbiddenException(
        'Impossible : cet utilisateur est le dernier administrateur actif.',
      );
    }
  }
}