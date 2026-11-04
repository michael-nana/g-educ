import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, randomUUID } from 'crypto';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';

@Injectable()
export class AnonymizationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async anonymize(user: AuthenticatedUser) {
    const account = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        role: true,
        anonymizedAt: true,
        studentProfile: {
          select: { id: true },
        },
      },
    });

    if (!account || account.anonymizedAt) {
      throw new NotFoundException('Compte introuvable.');
    }

    const suffix = randomUUID();
    const now = new Date();

    await this.prisma.$transaction(async (tx) => {
      if (account.studentProfile) {
        await tx.studentProfile.update({
          where: { id: account.studentProfile.id },
          data: {
            displayName: `Anonyme-${suffix}`,
            schoolName: null,
          },
        });
      }

      await tx.refreshToken.updateMany({
        where: { userId: user.id, revokedAt: null },
        data: { revokedAt: now },
      });

      await tx.deviceToken.deleteMany({
        where: { userId: user.id },
      });

      await tx.user.update({
        where: { id: user.id },
        data: {
          phone: `ANON-${suffix}`,
          passwordHash: randomBytes(48).toString('hex'),
          canPublish: false,
          mustChangePassword: false,
          anonymizedAt: now,
        },
      });

      await this.audit.log(
        {
          action: 'USER_ANONYMIZED',
          entityType: 'User',
          entityId: user.id,
          before: { role: account.role },
          after: { anonymizedAt: now },
        },
        tx,
      );
    });

    return {
      message:
        'Votre compte a été anonymisé. Vos contenus et historiques pédagogiques conservés ne sont pas supprimés.',
    };
  }
}