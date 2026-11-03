"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../../prisma/prisma.service");
const app_constants_1 = require("../../../common/config/app.constants");
const client_1 = require("../../../generated/prisma/client");
const otp_service_1 = require("./otp.service");
const refresh_token_service_1 = require("./refresh-token.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    otpService;
    refreshTokenService;
    constructor(prisma, jwtService, configService, otpService, refreshTokenService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.otpService = otpService;
        this.refreshTokenService = refreshTokenService;
    }
    async requestRegistrationOtp(phone) {
        await this.otpService.requestCode(phone, client_1.OtpPurpose.INSCRIPTION);
        return {
            message: 'Si le numéro est disponible, un code de vérification a été envoyé.',
        };
    }
    async verifyRegistrationOtp(phone, code) {
        const verificationToken = await this.otpService.verifyCode(phone, code, client_1.OtpPurpose.INSCRIPTION);
        if (!verificationToken) {
            throw new common_1.BadRequestException('Impossible de vérifier le numéro');
        }
        return {
            message: 'Numéro vérifié avec succès',
            verificationToken,
        };
    }
    async register(dto) {
        let verification;
        try {
            verification =
                await this.jwtService.verifyAsync(dto.verificationToken, {
                    secret: this.configService.getOrThrow('OTP_VERIFICATION_SECRET'),
                });
        }
        catch {
            throw new common_1.UnauthorizedException('Jeton de vérification invalide ou expiré');
        }
        if (verification.phone !== dto.phone ||
            verification.purpose !== client_1.OtpPurpose.INSCRIPTION) {
            throw new common_1.UnauthorizedException('Le numéro de téléphone n’a pas été vérifié');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { phone: dto.phone },
            select: { id: true },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Un compte existe déjà avec ce numéro');
        }
        const currentAcademicYear = await this.prisma.academicYear.findFirst({
            where: { isCurrent: true },
            select: { id: true },
        });
        if (!currentAcademicYear) {
            throw new common_1.BadRequestException('Aucune année académique courante n’est configurée');
        }
        const schoolClass = await this.prisma.class.findUnique({
            where: { id: dto.classId },
            select: { id: true },
        });
        if (!schoolClass) {
            throw new common_1.BadRequestException('La classe sélectionnée n’existe pas');
        }
        const passwordHash = await bcrypt.hash(dto.password, app_constants_1.APP_CONFIG.password.bcryptRounds);
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
        }
        catch (error) {
            const prismaError = error;
            if (prismaError.code === 'P2002') {
                throw new common_1.ConflictException('Ce numéro ou ce nom d’affichage est déjà utilisé');
            }
            throw error;
        }
    }
    async login(dto) {
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
            throw new common_1.UnauthorizedException('Identifiants incorrects');
        }
        if (user.status !== 'ACTIF') {
            throw new common_1.UnauthorizedException('Ce compte est suspendu');
        }
        if (user.lockedUntil && user.lockedUntil > new Date()) {
            throw new common_1.UnauthorizedException('Compte temporairement verrouillé. Réessayez plus tard.');
        }
        if (!user.phoneVerifiedAt) {
            throw new common_1.UnauthorizedException('Le numéro de téléphone n’a pas été vérifié');
        }
        const passwordIsValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordIsValid) {
            const failedLoginCount = user.failedLoginCount + 1;
            const lockedUntil = failedLoginCount >= app_constants_1.APP_CONFIG.login.maxFailedAttempts
                ? new Date(Date.now() +
                    app_constants_1.APP_CONFIG.login.lockMinutes * 60 * 1000)
                : null;
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    failedLoginCount,
                    lockedUntil,
                },
            });
            throw new common_1.UnauthorizedException(lockedUntil
                ? 'Trop de tentatives. Votre compte est temporairement verrouillé.'
                : 'Identifiants incorrects');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                failedLoginCount: 0,
                lockedUntil: null,
                lastLoginAt: new Date(),
            },
        });
        const tokens = await this.refreshTokenService.createSession({
            id: user.id,
            role: user.role,
        }, dto.deviceId, dto.deviceName);
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
    async refresh(refreshToken) {
        return this.refreshTokenService.rotate(refreshToken);
    }
    async logout(refreshToken) {
        await this.refreshTokenService.revoke(refreshToken);
        return {
            message: 'Déconnexion effectuée',
        };
    }
    async forgotPassword(phone) {
        await this.otpService.requestCode(phone, client_1.OtpPurpose.REINITIALISATION);
        return {
            message: 'Si ce numéro correspond à un compte, un code de réinitialisation a été envoyé.',
        };
    }
    async resetPassword(phone, code, newPassword) {
        await this.otpService.verifyCode(phone, code, client_1.OtpPurpose.REINITIALISATION);
        const user = await this.prisma.user.findUnique({
            where: { phone },
            select: { id: true },
        });
        if (!user) {
            throw new common_1.BadRequestException('Impossible de réinitialiser ce compte');
        }
        const passwordHash = await bcrypt.hash(newPassword, app_constants_1.APP_CONFIG.password.bcryptRounds);
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
    async changePassword(userId, dto) {
        if (dto.currentPassword === dto.newPassword) {
            throw new common_1.BadRequestException('Le nouveau mot de passe doit être différent de l’ancien');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                passwordHash: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        }
        const passwordIsValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
        if (!passwordIsValid) {
            throw new common_1.UnauthorizedException('Mot de passe actuel incorrect');
        }
        const passwordHash = await bcrypt.hash(dto.newPassword, app_constants_1.APP_CONFIG.password.bcryptRounds);
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
            message: 'Mot de passe modifié. Reconnectez-vous avec votre nouveau mot de passe.',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        otp_service_1.OtpService,
        refresh_token_service_1.RefreshTokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map