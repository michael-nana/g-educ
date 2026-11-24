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
exports.AnonymizationService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
let AnonymizationService = class AnonymizationService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async anonymize(user) {
        const account = await this.prisma.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                role: true,
                anonymizedAt: true,
                studentProfile: {
                    select: { id: true },
                },
            },
        });
        if (!account || account.anonymizedAt) {
            throw new common_1.NotFoundException('Compte introuvable.');
        }
        const suffix = (0, crypto_1.randomUUID)();
        const now = new Date();
        await this.prisma.$transaction(async (tx) => {
            if (account.studentProfile) {
                await tx.studentProfile.update({
                    where: { id: account.studentProfile.id },
                    data: {
                        displayName: `Anonyme-${suffix}`,
                        schoolName: null,
                    },
                });
            }
            await tx.refreshToken.updateMany({
                where: { userId: user.id, revokedAt: null },
                data: { revokedAt: now },
            });
            await tx.deviceToken.deleteMany({
                where: { userId: user.id },
            });
            await tx.user.update({
                where: { id: user.id },
                data: {
                    phone: `ANON-${suffix}`,
                    passwordHash: (0, crypto_1.randomBytes)(48).toString('hex'),
                    canPublish: false,
                    mustChangePassword: false,
                    anonymizedAt: now,
                },
            });
            await this.audit.log({
                action: 'USER_ANONYMIZED',
                entityType: 'User',
                entityId: user.id,
                before: { role: account.role },
                after: { anonymizedAt: now },
            }, tx);
        });
        return {
            message: 'Votre compte a été anonymisé. Vos contenus et historiques pédagogiques conservés ne sont pas supprimés.',
        };
    }
};
exports.AnonymizationService = AnonymizationService;
exports.AnonymizationService = AnonymizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], AnonymizationService);
//# sourceMappingURL=anonymization.service.js.map