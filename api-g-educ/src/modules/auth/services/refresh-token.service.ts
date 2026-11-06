import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomUUID } from 'crypto';

import { PrismaService } from '../../../prisma/prisma.service';
import { APP_CONFIG } from '../../../common/config/app.constants';

import type { Role } from '../../../generated/prisma/client';

interface RefreshPayload {
  sub: string;
  deviceId: string;
  jti: string;
}

interface TokenUser {
  id: string;
  role: Role;
}

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private generateAccessToken(user: TokenUser): Promise<string> {
    return this.jwtService.signAsync({
      sub: user.id,
      role: user.role,
    });
  }

  private generateRefreshToken(
    userId: string,
    deviceId: string,
  ): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: userId,
        deviceId,
        jti: randomUUID(),
      },
      {
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_SECRET',
        ),
        expiresIn: APP_CONFIG.token.refreshDays * 24 * 60 * 60,
      },
    );
  }

  async createSession(
    user: TokenUser,
    deviceId: string,
    deviceName?: string,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user.id, deviceId),
    ]);

    const expiresAt = new Date(
      Date.now() +
        APP_CONFIG.token.refreshDays * 24 * 60 * 60 * 1000,
    );

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: this.hashToken(refreshToken),
        deviceId,
        deviceName,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: APP_CONFIG.token.accessMinutes * 60,
    };
  }

  async rotate(refreshToken: string) {
    let payload: RefreshPayload;

    try {
      payload = await this.jwtService.verifyAsync<RefreshPayload>(
        refreshToken,
        {
          secret: this.configService.getOrThrow<string>(
            'JWT_REFRESH_SECRET',
          ),
        },
      );
    } catch {
      throw new UnauthorizedException(
        'Refresh token invalide ou expiré',
      );
    }

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: {
        tokenHash: this.hashToken(refreshToken),
      },
      include: {
        user: {
          select: {
            id: true,
            role: true,
            status: true,
            anonymizedAt: true,
          },
        },
      },
    });

    if (
      !storedToken ||
      storedToken.revokedAt ||
      storedToken.expiresAt <= new Date() ||
      storedToken.userId !== payload.sub ||
      storedToken.deviceId !== payload.deviceId ||
      storedToken.user.status !== 'ACTIF' ||
      storedToken.user.anonymizedAt
    ) {
      throw new UnauthorizedException(
        'Session invalide ou révoquée',
      );
    }

    const newRefreshToken = await this.generateRefreshToken(
      storedToken.user.id,
      storedToken.deviceId,
    );

    const newExpiresAt = new Date(
      Date.now() +
        APP_CONFIG.token.refreshDays * 24 * 60 * 60 * 1000,
    );

    await this.prisma.$transaction(async (tx) => {
      const created = await tx.refreshToken.create({
        data: {
          userId: storedToken.user.id,
          tokenHash: this.hashToken(newRefreshToken),
          deviceId: storedToken.deviceId,
          deviceName: storedToken.deviceName,
          expiresAt: newExpiresAt,
        },
      });

      const revoked = await tx.refreshToken.updateMany({
        where: {
          id: storedToken.id,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
          replacedById: created.id,
          lastUsedAt: new Date(),
        },
      });

      if (revoked.count !== 1) {
        throw new UnauthorizedException(
          'Ce refresh token a déjà été utilisé',
        );
      }
    });

    const accessToken = await this.generateAccessToken({
      id: storedToken.user.id,
      role: storedToken.user.role,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: APP_CONFIG.token.accessMinutes * 60,
    };
  }

  async revoke(refreshToken: string): Promise<string | null> {
  const storedToken = await this.prisma.refreshToken.findUnique({
    where: {
      tokenHash: this.hashToken(refreshToken),
    },
    select: {
      id: true,
      userId: true,
      revokedAt: true,
    },
  });

  if (!storedToken) {
    return null;
  }

  if (!storedToken.revokedAt) {
    await this.prisma.refreshToken.updateMany({
      where: {
        id: storedToken.id,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
        lastUsedAt: new Date(),
      },
    });
  }

  return storedToken.userId;
}

  async revokeAllForUser(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }
}