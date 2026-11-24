import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import type { Role } from '../../../generated/prisma/client';
interface TokenUser {
    id: string;
    role: Role;
}
export declare class RefreshTokenService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    private hashToken;
    private generateAccessToken;
    private generateRefreshToken;
    createSession(user: TokenUser, deviceId: string, deviceName?: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    rotate(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    revoke(refreshToken: string): Promise<string | null>;
    revokeAllForUser(userId: string): Promise<void>;
}
export {};
