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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
const common_2 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const app_constants_1 = require("../../../common/config/app.constants");
const sms_module_1 = require("../../../common/sms/sms.module");
const config_1 = require("@nestjs/config");
const client_1 = require("../../../generated/prisma/client");
let OtpService = class OtpService {
    prisma;
    jwtService;
    configService;
    smsProvider;
    constructor(prisma, jwtService, configService, smsProvider) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.smsProvider = smsProvider;
    }
    hashCode(code) {
        return (0, crypto_1.createHash)('sha256').update(code).digest('hex');
    }
    generateCode() {
        const minimum = 10 ** (app_constants_1.APP_CONFIG.otp.codeLength - 1);
        const maximum = 10 ** app_constants_1.APP_CONFIG.otp.codeLength;
        return (0, crypto_1.randomInt)(minimum, maximum).toString();
    }
    async requestCode(phone, purpose) {
        if (purpose === client_1.OtpPurpose.INSCRIPTION) {
            const existingUser = await this.prisma.user.findUnique({
                where: { phone },
                select: { id: true },
            });
            if (existingUser) {
                throw new common_1.ConflictException('Un compte existe déjà avec ce numéro');
            }
        }
        if (purpose === client_1.OtpPurpose.REINITIALISATION) {
            const existingUser = await this.prisma.user.findUnique({
                where: { phone },
                select: { id: true },
            });
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
        if (requestsCount >= app_constants_1.APP_CONFIG.otp.maxRequestsPerHour) {
            throw new common_2.HttpException('Trop de tentatives', common_2.HttpStatus.TOO_MANY_REQUESTS);
        }
        const code = this.generateCode();
        const expiresAt = new Date(Date.now() + app_constants_1.APP_CONFIG.otp.expiresInMinutes * 60 * 1000);
        await this.prisma.otpCode.create({
            data: {
                phone,
                purpose,
                codeHash: this.hashCode(code),
                expiresAt,
            },
        });
        const message = `Votre code G-Educ est : ${code}. ` +
            `Il expire dans ${app_constants_1.APP_CONFIG.otp.expiresInMinutes} minutes.`;
        await this.smsProvider.send(phone, message);
    }
    async verifyCode(phone, code, purpose) {
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
            throw new common_1.BadRequestException('Code OTP invalide ou expiré');
        }
        if (otp.attempts >= app_constants_1.APP_CONFIG.otp.maxAttempts) {
            throw new common_1.BadRequestException('Nombre maximal de tentatives atteint');
        }
        const attempts = otp.attempts + 1;
        if (this.hashCode(code) !== otp.codeHash) {
            await this.prisma.otpCode.update({
                where: { id: otp.id },
                data: { attempts },
            });
            throw new common_1.BadRequestException('Code OTP incorrect');
        }
        await this.prisma.otpCode.update({
            where: { id: otp.id },
            data: {
                attempts,
                consumedAt: new Date(),
            },
        });
        if (purpose === client_1.OtpPurpose.INSCRIPTION) {
            return this.jwtService.signAsync({
                phone,
                purpose,
            }, {
                secret: this.configService.getOrThrow('OTP_VERIFICATION_SECRET'),
                expiresIn: app_constants_1.APP_CONFIG.otp.verificationTokenMinutes * 60,
            });
        }
        return null;
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(sms_module_1.SMS_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService, Object])
], OtpService);
//# sourceMappingURL=otp.service.js.map