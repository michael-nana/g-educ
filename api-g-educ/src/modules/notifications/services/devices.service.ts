import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import type { RegisterDeviceDto } from '../dto/register-device.dto';

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  async register(
    user: AuthenticatedUser,
    dto: RegisterDeviceDto,
  ) {
    const device = await this.prisma.deviceToken.upsert({
      where: { token: dto.token },
      create: {
        userId: user.id,
        token: dto.token,
        platform: dto.platform,
        appVersion: dto.appVersion,
        lastSeenAt: new Date(),
      },
      update: {
        userId: user.id,
        platform: dto.platform,
        appVersion: dto.appVersion,
        lastSeenAt: new Date(),
      },
      select: {
        id: true,
        platform: true,
        appVersion: true,
        lastSeenAt: true,
        createdAt: true,
      },
    });

    return {
      message: 'Appareil enregistré avec succès.',
      device,
    };
  }

  async remove(user: AuthenticatedUser, token: string) {
    await this.prisma.deviceToken.deleteMany({
      where: {
        userId: user.id,
        token,
      },
    });

    return {
      message: 'Appareil supprimé avec succès.',
    };
  }
}