import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../../prisma/prisma.service';
import { APP_CONFIG } from '../../../common/config/app.constants';
import { OtpPurpose } from '../../../generated/prisma/client';

import { OtpService } from './otp.service';
import { RefreshTokenService } from './refresh-token.service';

import type { RegisterDto } from '../dto/register.dto';
import type { LoginDto } from '../dto/login.dto';
import type { ChangePasswordDto } from '../dto/change-password.dto';

interface RegistrationVerificationPayload {
  phone: string;
  purpose: OtpPurpose;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly otpService: OtpService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async requestRegistrationOtp(phone: string) {
    await this.otpService.requestCode(
      phone,
      OtpPurpose.INSCRIPTION,
    );

    return {
      message: 'Si le numéro est disponible, un code de vérification a été envoyé.',
    };
  }

  async verifyRegistrationOtp(phone: string, code: string) {
    const verificationToken = await this.otpService.verifyCode(
      phone,
      code,
      OtpPurpose.INSCRIPTION,
    );

    if (!verificationToken) {
      throw new BadRequestException(
        'Impossible de vérifier le numéro',
      );
    }

    return {
      message: 'Numéro vérifié avec succès',
      verificationToken,
    };
  }

  async register(dto: RegisterDto) {
    let verification: RegistrationVerificationPayload;

    try {
      verification =
        await this.jwtService.verifyAsync<RegistrationVerificationPayload>(
          dto.verificationToken,
          {
            secret: this.configService.getOrThrow<string>(
              'OTP_VERIFICATION_SECRET',
            ),
          },
        );
    } catch {
      throw new UnauthorizedException(
        'Jeton de vérification invalide ou expiré',
      );
    }

    if (
      verification.phone !== dto.phone ||
      verification.purpose !== OtpPurpose.INSCRIPTION
    ) {
      throw new UnauthorizedException(
        'Le numéro de téléphone n’a pas été vérifié',
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException(
        'Un compte existe déjà avec ce numéro',
      );
    }

    const currentAcademicYear =
      await this.prisma.academicYear.findFirst({
        where: { isCurrent: true },
        select: { id: true },
      });

    if (!currentAcademicYear) {
      throw new BadRequestException(
        'Aucune année académique courante n’est configurée',
      );
    }

    const schoolClass = await this.prisma.class.findUnique({
      where: { id: dto.classId },
      select: { id: true },
    });

    if (!schoolClass) {
      throw new BadRequestException(
        'La classe sélectionnée n’existe pas',
      );
    }

    const passwordHash = await bcrypt.hash(
      dto.password,
      APP_CONFIG.password.bcryptRounds,
    );

    try {
      const user = await this.prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
          data: {
            phone: dto.phone,
            passwordHash,
            role: 'ELEVE',
            phoneVerifiedAt: new Date(),
          },
          select: {
            id: true,
            phone: true,
            role: true,
            status: true,
          },
        });

        const studentProfile = await tx.studentProfile.create({
          data: {
            userId: createdUser.id,
            displayName: dto.displayName,
            schoolName: dto.schoolName,
            classId: dto.classId,
            academicYearId: currentAcademicYear.id,
          },
          select: {
            id: true,
            displayName: true,
            classId: true,
            academicYearId: true,
          },
        });

        await tx.classEnrollment.create({
          data: {
            studentProfileId: studentProfile.id,
            academicYearId: currentAcademicYear.id,
            classId: dto.classId,
          },
        });

        await tx.userStreak.create({
          data: {
            userId: createdUser.id,
          },
        });

        return {
          ...createdUser,
          studentProfile,
        };
      });

      return {
        message: 'Compte élève créé avec succès',
        user,
      };
    } catch (error) {
      const prismaError = error as { code?: string };

      if (prismaError.code === 'P2002') {
        throw new ConflictException(
          'Ce numéro ou ce nom d’affichage est déjà utilisé',
        );
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
      select: {
        id: true,
        phone: true,
        passwordHash: true,
        role: true,
        status: true,
        canPublish: true,
        mustChangePassword: true,
        phoneVerifiedAt: true,
        failedLoginCount: true,
        lockedUntil: true,
        anonymizedAt: true,
        studentProfile: {
          select: {
            displayName: true,
            classId: true,
          },
        },
      },
    });

    if (!user || user.anonymizedAt) {
      throw new UnauthorizedException(
        'Identifiants incorrects',
      );
    }

    if (user.status !== 'ACTIF') {
      throw new UnauthorizedException(
        'Ce compte est suspendu',
      );
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException(
        'Compte temporairement verrouillé. Réessayez plus tard.',
      );
    }

    if (!user.phoneVerifiedAt) {
      throw new UnauthorizedException(
        'Le numéro de téléphone n’a pas été vérifié',
      );
    }

    const passwordIsValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordIsValid) {
      const failedLoginCount = user.failedLoginCount + 1;

      const lockedUntil =
        failedLoginCount >= APP_CONFIG.login.maxFailedAttempts
          ? new Date(
              Date.now() +
                APP_CONFIG.login.lockMinutes * 60 * 1000,
            )
          : null;

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginCount,
          lockedUntil,
        },
      });

      throw new UnauthorizedException(
        lockedUntil
          ? 'Trop de tentatives. Votre compte est temporairement verrouillé.'
          : 'Identifiants incorrects',
      );
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginCount: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
      },
    });

    const tokens = await this.refreshTokenService.createSession(
      {
        id: user.id,
        role: user.role,
      },
      dto.deviceId,
      dto.deviceName,
    );

    return {
      message: 'Connexion réussie',
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        status: user.status,
        canPublish: user.canPublish,
        mustChangePassword: user.mustChangePassword,
        studentProfile: user.studentProfile,
      },
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    return this.refreshTokenService.rotate(refreshToken);
  }

async logout(refreshToken: string, deviceToken?: string) {
  const userId = await this.refreshTokenService.revoke(refreshToken);

  if (userId && deviceToken) {
    await this.prisma.deviceToken.deleteMany({
      where: {
        userId,
        token: deviceToken,
      },
    });
  }

  return {
    message: 'Déconnexion effectuée',
  };
}

  async forgotPassword(phone: string) {
    await this.otpService.requestCode(
      phone,
      OtpPurpose.REINITIALISATION,
    );

    return {
      message:
        'Si ce numéro correspond à un compte, un code de réinitialisation a été envoyé.',
    };
  }

  async resetPassword(
    phone: string,
    code: string,
    newPassword: string,
  ) {
    await this.otpService.verifyCode(
      phone,
      code,
      OtpPurpose.REINITIALISATION,
    );

    const user = await this.prisma.user.findUnique({
      where: { phone },
      select: { id: true },
    });

    if (!user) {
      throw new BadRequestException(
        'Impossible de réinitialiser ce compte',
      );
    }

    const passwordHash = await bcrypt.hash(
      newPassword,
      APP_CONFIG.password.bcryptRounds,
    );

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          failedLoginCount: 0,
          lockedUntil: null,
          mustChangePassword: false,
        },
      }),
      this.prisma.refreshToken.updateMany({
        where: {
          userId: user.id,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      }),
    ]);

    return {
      message: 'Mot de passe réinitialisé avec succès',
    };
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
  ) {
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException(
        'Le nouveau mot de passe doit être différent de l’ancien',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        passwordHash: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Utilisateur introuvable',
      );
    }

    const passwordIsValid = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException(
        'Mot de passe actuel incorrect',
      );
    }

    const passwordHash = await bcrypt.hash(
      dto.newPassword,
      APP_CONFIG.password.bcryptRounds,
    );

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          mustChangePassword: false,
        },
      }),
      this.prisma.refreshToken.updateMany({
        where: {
          userId: user.id,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      }),
    ]);

    return {
      message:
        'Mot de passe modifié. Reconnectez-vous avec votre nouveau mot de passe.',
    };
  }
}