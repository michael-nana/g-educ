"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../../../prisma/prisma.service");
const app_constants_1 = require("../../../common/config/app.constants");
let RefreshTokenService = class RefreshTokenService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    hashToken(token) {
        return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
    }
    generateAccessToken(user) {
        return this.jwtService.signAsync({
            sub: user.id,
            role: user.role,
        });
    }
    generateRefreshToken(userId, deviceId) {
        return this.jwtService.signAsync({
            sub: userId,
            deviceId,
            jti: (0, crypto_1.randomUUID)(),
        }, {
            secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
            expiresIn: app_constants_1.APP_CONFIG.token.refreshDays * 24 * 60 * 60,
        });
    }
    async createSession(user, deviceId, deviceName) {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(user),
            this.generateRefreshToken(user.id, deviceId),
        ]);
        const expiresAt = new Date(Date.now() +
            app_constants_1.APP_CONFIG.token.refreshDays * 24 * 60 * 60 * 1000);
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
            expiresIn: app_constants_1.APP_CONFIG.token.accessMinutes * 60,
        };
    }
    async rotate(refreshToken) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Refresh token invalide ou expiré');
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
        if (!storedToken ||
            storedToken.revokedAt ||
            storedToken.expiresAt <= new Date() ||
            storedToken.userId !== payload.sub ||
            storedToken.deviceId !== payload.deviceId ||
            storedToken.user.status !== 'ACTIF' ||
            storedToken.user.anonymizedAt) {
            throw new common_1.UnauthorizedException('Session invalide ou révoquée');
        }
        const newRefreshToken = await this.generateRefreshToken(storedToken.user.id, storedToken.deviceId);
        const newExpiresAt = new Date(Date.now() +
            app_constants_1.APP_CONFIG.token.refreshDays * 24 * 60 * 60 * 1000);
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
                throw new common_1.UnauthorizedException('Ce refresh token a déjà été utilisé');
            }
        });
        const accessToken = await this.generateAccessToken({
            id: storedToken.user.id,
            role: storedToken.user.role,
        });
        return {
            accessToken,
            refreshToken: newRefreshToken,
            expiresIn: app_constants_1.APP_CONFIG.token.accessMinutes * 60,
        };
    }
    async revoke(refreshToken) {
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
    async revokeAllForUser(userId) {
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
};
exports.RefreshTokenService = RefreshTokenService;
exports.RefreshTokenService = RefreshTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], RefreshTokenService);
//# sourceMappingURL=refresh-token.service.js.map