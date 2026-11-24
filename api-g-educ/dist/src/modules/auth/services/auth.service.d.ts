import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { OtpService } from './otp.service';
import { RefreshTokenService } from './refresh-token.service';
import type { RegisterDto } from '../dto/register.dto';
import type { LoginDto } from '../dto/login.dto';
import type { ChangePasswordDto } from '../dto/change-password.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly otpService;
    private readonly refreshTokenService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, otpService: OtpService, refreshTokenService: RefreshTokenService);
    requestRegistrationOtp(phone: string): Promise<{
        message: string;
    }>;
    verifyRegistrationOtp(phone: string, code: string): Promise<{
        message: string;
        verificationToken: string;
    }>;
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            studentProfile: {
                id: string;
                classId: string;
                displayName: string;
                academicYearId: string;
            };
            id: string;
            phone: string;
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        message: string;
        user: {
            id: string;
            phone: string;
            role: import("../../../generated/prisma/enums").Role;
            status: "ACTIF";
            canPublish: boolean;
            mustChangePassword: boolean;
            studentProfile: {
                classId: string;
                displayName: string;
            } | null;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    logout(refreshToken: string, deviceToken?: string): Promise<{
        message: string;
    }>;
    forgotPassword(phone: string): Promise<{
        message: string;
    }>;
    resetPassword(phone: string, code: string, newPassword: string): Promise<{
        message: string;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
