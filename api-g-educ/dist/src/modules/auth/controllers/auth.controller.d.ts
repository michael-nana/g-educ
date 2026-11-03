import { AuthService } from '../services/auth.service';
import { RequestRegistrationOtpDto } from '../dto/request-registration-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { LogoutDto } from '../dto/logout.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    requestRegistrationOtp(dto: RequestRegistrationOtpDto): Promise<{
        message: string;
    }>;
    verifyRegistrationOtp(dto: VerifyOtpDto): Promise<{
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
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    logout(dto: LogoutDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    changePassword(user: AuthenticatedUser, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
