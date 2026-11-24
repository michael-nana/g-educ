import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import type { SmsProvider } from '../../../common/sms/sms.provider';
import { ConfigService } from '@nestjs/config';
import { OtpPurpose } from '../../../generated/prisma/client';
export declare class OtpService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly smsProvider;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, smsProvider: SmsProvider);
    private hashCode;
    private generateCode;
    requestCode(phone: string, purpose: OtpPurpose): Promise<void>;
    verifyCode(phone: string, code: string, purpose: OtpPurpose): Promise<string | null>;
}
