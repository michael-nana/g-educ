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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
const auth_service_1 = require("../../auth/services/auth.service");
let UsersService = class UsersService {
    prisma;
    audit;
    authService;
    constructor(prisma, audit, authService) {
        this.prisma = prisma;
        this.audit = audit;
        this.authService = authService;
    }
    async getMe(user) {
        const account = await this.prisma.user.findFirst({
            where: {
                id: user.id,
                anonymizedAt: null,
            },
            select: {
                id: true,
                phone: true,
                role: true,
                status: true,
                canPublish: true,
                mustChangePassword: true,
                phoneVerifiedAt: true,
                lastLoginAt: true,
                createdAt: true,
                studentProfile: {
                    select: {
                        id: true,
                        displayName: true,
                        schoolName: true,
                        classId: true,
                        academicYearId: true,
                    },
                },
            },
        });
        if (!account) {
            throw new common_1.NotFoundException('Utilisateur introuvable.');
        }
        return account;
    }
    async updateMyProfile(user, dto) {
        const profile = await this.prisma.studentProfile.findUnique({
            where: { userId: user.id },
            select: {
                id: true,
                displayName: true,
                schoolName: true,
            },
        });
        if (!profile) {
            throw new common_1.BadRequestException('Aucun profil élève associé à ce compte.');
        }
        const updated = await this.prisma.studentProfile.update({
            where: { id: profile.id },
            data: {
                ...(dto.displayName !== undefined && {
                    displayName: dto.displayName.trim(),
                }),
                ...(dto.schoolName !== undefined && {
                    schoolName: dto.schoolName?.trim() || null,
                }),
            },
            select: {
                id: true,
                displayName: true,
                schoolName: true,
                classId: true,
                academicYearId: true,
                updatedAt: true,
            },
        });
        await this.audit.log({
            action: 'USER_PROFILE_UPDATED',
            entityType: 'StudentProfile',
            entityId: profile.id,
            before: profile,
            after: updated,
        });
        return updated;
    }
    async changePassword(user, dto) {
        const result = await this.authService.changePassword(user.id, dto);
        await this.audit.log({
            action: 'USER_PASSWORD_CHANGED',
            entityType: 'User',
            entityId: user.id,
        });
        return result;
    }
    async list(dto) {
        const page = Math.max(1, Number(dto.page ?? 1));
        const limit = Math.min(100, Math.max(1, Number(dto.limit ?? 20)));
        const skip = (page - 1) * limit;
        const where = {
            anonymizedAt: null,
            ...(dto.role && { role: dto.role }),
            ...(dto.status && { status: dto.status }),
            ...(dto.search && {
                OR: [
                    { phone: { contains: dto.search } },
                    {
                        studentProfile: {
                            is: {
                                displayName: { contains: dto.search, mode: 'insensitive' },
                            },
                        },
                    },
                ],
            }),
        };
        const [items, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    phone: true,
                    role: true,
                    status: true,
                    canPublish: true,
                    mustChangePassword: true,
                    lastLoginAt: true,
                    createdAt: true,
                    studentProfile: {
                        select: {
                            displayName: true,
                            classId: true,
                            schoolName: true,
                        },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return {
            data: items,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const account = await this.prisma.user.findFirst({
            where: { id, anonymizedAt: null },
            select: {
                id: true,
                phone: true,
                role: true,
                status: true,
                canPublish: true,
                mustChangePassword: true,
                phoneVerifiedAt: true,
                lastLoginAt: true,
                createdAt: true,
                updatedAt: true,
                studentProfile: {
                    select: {
                        id: true,
                        displayName: true,
                        schoolName: true,
                        classId: true,
                        academicYearId: true,
                    },
                },
                teacherAssignments: {
                    select: {
                        id: true,
                        classSubjectId: true,
                    },
                },
            },
        });
        if (!account) {
            throw new common_1.NotFoundException('Utilisateur introuvable.');
        }
        return account;
    }
    async updateUser(admin, id, dto) {
        const target = await this.prisma.user.findFirst({
            where: { id, anonymizedAt: null },
            select: {
                id: true,
                role: true,
                canPublish: true,
                status: true,
            },
        });
        if (!target) {
            throw new common_1.NotFoundException('Utilisateur introuvable.');
        }
        if (admin.id === id && dto.role && dto.role !== client_1.Role.ADMINISTRATEUR) {
            throw new common_1.ForbiddenException('Vous ne pouvez pas modifier votre propre rôle.');
        }
        if (target.role === client_1.Role.ADMINISTRATEUR &&
            dto.role &&
            dto.role !== client_1.Role.ADMINISTRATEUR) {
            await this.assertNotLastActiveAdmin(id);
        }
        const updated = await this.prisma.user.update({
            where: { id },
            data: {
                ...(dto.role !== undefined && { role: dto.role }),
                ...(dto.canPublish !== undefined && {
                    canPublish: dto.canPublish,
                }),
            },
            select: {
                id: true,
                phone: true,
                role: true,
                canPublish: true,
                status: true,
            },
        });
        if (dto.role !== undefined && dto.role !== target.role) {
            await this.audit.log({
                action: 'ROLE_CHANGED',
                entityType: 'User',
                entityId: id,
                before: { role: target.role },
                after: { role: updated.role },
            });
        }
        if (dto.canPublish !== undefined &&
            dto.canPublish !== target.canPublish) {
            await this.audit.log({
                action: 'USER_PUBLISH_PERMISSION_CHANGED',
                entityType: 'User',
                entityId: id,
                before: { canPublish: target.canPublish },
                after: { canPublish: updated.canPublish },
            });
        }
        return updated;
    }
    async suspend(admin, id) {
        if (admin.id === id) {
            throw new common_1.ForbiddenException('Vous ne pouvez pas suspendre votre propre compte.');
        }
        const target = await this.prisma.user.findFirst({
            where: { id, anonymizedAt: null },
            select: { id: true, role: true, status: true },
        });
        if (!target) {
            throw new common_1.NotFoundException('Utilisateur introuvable.');
        }
        if (target.status === client_1.UserStatus.SUSPENDU) {
            throw new common_1.BadRequestException('Ce compte est déjà suspendu.');
        }
        if (target.role === client_1.Role.ADMINISTRATEUR) {
            await this.assertNotLastActiveAdmin(id);
        }
        const updated = await this.prisma.$transaction(async (tx) => {
            const account = await tx.user.update({
                where: { id },
                data: { status: client_1.UserStatus.SUSPENDU },
                select: { id: true, status: true, role: true },
            });
            await tx.refreshToken.updateMany({
                where: { userId: id, revokedAt: null },
                data: { revokedAt: new Date() },
            });
            await this.audit.log({
                action: 'USER_SUSPENDED',
                entityType: 'User',
                entityId: id,
                before: { status: target.status },
                after: { status: account.status },
            }, tx);
            return account;
        });
        return updated;
    }
    async reactivate(_admin, id) {
        const target = await this.prisma.user.findFirst({
            where: { id, anonymizedAt: null },
            select: { id: true, status: true },
        });
        if (!target) {
            throw new common_1.NotFoundException('Utilisateur introuvable.');
        }
        if (target.status === client_1.UserStatus.ACTIF) {
            throw new common_1.BadRequestException('Ce compte est déjà actif.');
        }
        const updated = await this.prisma.user.update({
            where: { id },
            data: { status: client_1.UserStatus.ACTIF },
            select: { id: true, status: true },
        });
        await this.audit.log({
            action: 'USER_REACTIVATED',
            entityType: 'User',
            entityId: id,
            before: { status: target.status },
            after: { status: updated.status },
        });
        return updated;
    }
    async assertNotLastActiveAdmin(excludedId) {
        const count = await this.prisma.user.count({
            where: {
                role: client_1.Role.ADMINISTRATEUR,
                status: client_1.UserStatus.ACTIF,
                anonymizedAt: null,
                id: { not: excludedId },
            },
        });
        if (count === 0) {
            throw new common_1.ForbiddenException('Impossible : cet utilisateur est le dernier administrateur actif.');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map