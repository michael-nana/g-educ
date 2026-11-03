import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../../prisma/prisma.service';
import { ClsContextService } from '../../../common/cls/cls-context.service';

import type { JwtPayload } from '../interfaces/jwt-payload.interface';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly clsContext: ClsContextService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(
        'JWT_ACCESS_SECRET',
      ),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        role: true,
        status: true,
        canPublish: true,
        anonymizedAt: true,
        studentProfile: {
          select: {
            classId: true,
          },
        },
      },
    });

    if (!user || user.status !== 'ACTIF' || user.anonymizedAt) {
      throw new UnauthorizedException(
        'Compte invalide ou désactivé',
      );
    }

    if (user.role !== payload.role) {
      throw new UnauthorizedException(
        'Session invalide',
      );
    }

    const classId = user.studentProfile?.classId ?? null;

    this.clsContext.setUserContext({
      userId: user.id,
      role: user.role,
      classId,
      status: user.status,
      canPublish: user.canPublish,
    });

    return {
      id: user.id,
      role: user.role,
      status: user.status,
      canPublish: user.canPublish,
      classId,
    };
  }
}