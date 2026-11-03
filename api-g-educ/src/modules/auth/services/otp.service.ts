import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomInt } from 'crypto';
import { HttpException, HttpStatus } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { APP_CONFIG } from '../../../common/config/app.constants';
import { SMS_PROVIDER } from '../../../common/sms/sms.module';
import type { SmsProvider } from '../../../common/sms/sms.provider';
import { ConfigService } from '@nestjs/config';
import { OtpPurpose } from '../../../generated/prisma/client';

@Injectable()
export class OtpService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
    @Inject(SMS_PROVIDER)
    private readonly smsProvider: SmsProvider,
  ) {}

  private hashCode(code: string): string {
    return createHash('sha256').update(code).digest('hex');
  }

  private generateCode(): string {
    const minimum = 10 ** (APP_CONFIG.otp.codeLength - 1);
    const maximum = 10 ** APP_CONFIG.otp.codeLength;

    return randomInt(minimum, maximum).toString();
  }

  async requestCode(
    phone: string,
    purpose: OtpPurpose,
  ): Promise<void> {
    if (purpose === OtpPurpose.INSCRIPTION) {
      const existingUser = await this.prisma.user.findUnique({
        where: { phone },
        select: { id: true },
      });

      if (existingUser) {
        throw new ConflictException(
          'Un compte existe déjà avec ce numéro',
        );
      }
    }

    if (purpose === OtpPurpose.REINITIALISATION) {
      const existingUser = await this.prisma.user.findUnique({
        where: { phone },
        select: { id: true },
      });

      // Ne pas révéler si un numéro possède un compte.
      if (!existingUser) {
        return;
      }
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const requestsCount = await this.prisma.otpCode.count({
      where: {
        phone,
        purpose,
        createdAt: {
          gte: oneHourAgo,
        },
      },
    });

    if (requestsCount >= APP_CONFIG.otp.maxRequestsPerHour) {
throw new HttpException(
  'Trop de tentatives',
  HttpStatus.TOO_MANY_REQUESTS,
);
    }

    const code = this.generateCode();

    const expiresAt = new Date(
      Date.now() + APP_CONFIG.otp.expiresInMinutes * 60 * 1000,
    );

    await this.prisma.otpCode.create({
      data: {
        phone,
        purpose,
        codeHash: this.hashCode(code),
        expiresAt,
      },
    });

    const message =
      `Votre code G-Educ est : ${code}. ` +
      `Il expire dans ${APP_CONFIG.otp.expiresInMinutes} minutes.`;

    await this.smsProvider.send(phone, message);
  }

  async verifyCode(
    phone: string,
    code: string,
    purpose: OtpPurpose,
  ): Promise<string | null> {
    const otp = await this.prisma.otpCode.findFirst({
      where: {
        phone,
        purpose,
        consumedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otp) {
      throw new BadRequestException(
        'Code OTP invalide ou expiré',
      );
    }

    if (otp.attempts >= APP_CONFIG.otp.maxAttempts) {
      throw new BadRequestException(
        'Nombre maximal de tentatives atteint',
      );
    }

    const attempts = otp.attempts + 1;

    if (this.hashCode(code) !== otp.codeHash) {
      await this.prisma.otpCode.update({
        where: { id: otp.id },
        data: { attempts },
      });

      throw new BadRequestException(
        'Code OTP incorrect',
      );
    }

    await this.prisma.otpCode.update({
      where: { id: otp.id },
      data: {
        attempts,
        consumedAt: new Date(),
      },
    });

    if (purpose === OtpPurpose.INSCRIPTION) {
      return this.jwtService.signAsync(
        {
          phone,
          purpose,
        },
        {
          secret: this.configService.getOrThrow<string>(
  'OTP_VERIFICATION_SECRET',
),
          expiresIn:
            APP_CONFIG.otp.verificationTokenMinutes * 60,
        },
      );
    }

    return null;
  }
}