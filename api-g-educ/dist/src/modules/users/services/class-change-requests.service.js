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
exports.ClassChangeRequestsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
let ClassChangeRequestsService = class ClassChangeRequestsService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async create(user, dto) {
        if (user.role !== client_1.Role.ELEVE) {
            throw new common_1.BadRequestException('Seul un élève peut demander un changement de classe.');
        }
        const profile = await this.prisma.studentProfile.findUnique({
            where: { userId: user.id },
            select: {
                id: true,
                classId: true,
                academicYearId: true,
            },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profil élève introuvable.');
        }
        if (profile.classId === dto.toClassId) {
            throw new common_1.BadRequestException('La classe cible est déjà votre classe actuelle.');
        }
        const targetClass = await this.prisma.class.findUnique({
            where: { id: dto.toClassId },
            select: { id: true },
        });
        if (!targetClass) {
            throw new common_1.NotFoundException('Classe cible introuvable.');
        }
        const currentYear = await this.prisma.academicYear.findFirst({
            where: { isCurrent: true },
            select: { id: true },
        });
        if (!currentYear) {
            throw new common_1.BadRequestException('Aucune année scolaire courante n’est configurée.');
        }
        const pending = await this.prisma.classChangeRequest.findFirst({
            where: {
                studentProfileId: profile.id,
                status: client_1.RequestStatus.EN_ATTENTE,
            },
            select: { id: true },
        });
        if (pending) {
            throw new common_1.BadRequestException('Vous avez déjà une demande de changement de classe en attente.');
        }
        const request = await this.prisma.classChangeRequest.create({
            data: {
                studentProfileId: profile.id,
                academicYearId: currentYear.id,
                fromClassId: profile.classId,
                toClassId: dto.toClassId,
                note: dto.note,
            },
            select: {
                id: true,
                academicYearId: true,
                fromClassId: true,
                toClassId: true,
                status: true,
                note: true,
                createdAt: true,
            },
        });
        await this.audit.log({
            action: 'CLASS_CHANGE_REQUEST_CREATED',
            entityType: 'ClassChangeRequest',
            entityId: request.id,
            after: request,
        });
        return request;
    }
    async list() {
        return this.prisma.classChangeRequest.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                studentProfileId: true,
                academicYearId: true,
                fromClassId: true,
                toClassId: true,
                status: true,
                note: true,
                reviewedById: true,
                reviewedAt: true,
                createdAt: true,
            },
        });
    }
    async approve(admin, id, dto) {
        return this.review(admin, id, client_1.RequestStatus.APPROUVEE, dto);
    }
    async reject(admin, id, dto) {
        return this.review(admin, id, client_1.RequestStatus.REFUSEE, dto);
    }
    async review(admin, id, status, dto) {
        const request = await this.prisma.classChangeRequest.findUnique({
            where: { id },
            select: {
                id: true,
                studentProfileId: true,
                academicYearId: true,
                fromClassId: true,
                toClassId: true,
                status: true,
            },
        });
        if (!request) {
            throw new common_1.NotFoundException('Demande introuvable.');
        }
        if (request.status !== client_1.RequestStatus.EN_ATTENTE) {
            throw new common_1.BadRequestException('Cette demande a déjà été traitée.');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            if (status === client_1.RequestStatus.APPROUVEE) {
                await tx.studentProfile.update({
                    where: { id: request.studentProfileId },
                    data: {
                        classId: request.toClassId,
                        academicYearId: request.academicYearId,
                    },
                });
                await tx.classEnrollment.upsert({
                    where: {
                        studentProfileId_academicYearId: {
                            studentProfileId: request.studentProfileId,
                            academicYearId: request.academicYearId,
                        },
                    },
                    create: {
                        studentProfileId: request.studentProfileId,
                        academicYearId: request.academicYearId,
                        classId: request.toClassId,
                    },
                    update: {
                        classId: request.toClassId,
                    },
                });
            }
            const updated = await tx.classChangeRequest.update({
                where: { id },
                data: {
                    status,
                    reviewedById: admin.id,
                    reviewedAt: new Date(),
                    ...(dto.note !== undefined && { note: dto.note }),
                },
                select: {
                    id: true,
                    status: true,
                    reviewedById: true,
                    reviewedAt: true,
                    note: true,
                },
            });
            await this.audit.log({
                action: status === client_1.RequestStatus.APPROUVEE
                    ? 'CLASS_CHANGE_REQUEST_APPROVED'
                    : 'CLASS_CHANGE_REQUEST_REJECTED',
                entityType: 'ClassChangeRequest',
                entityId: id,
                before: { status: request.status },
                after: updated,
            }, tx);
            if (status === client_1.RequestStatus.APPROUVEE) {
                await this.audit.log({
                    action: 'CLASS_CHANGED',
                    entityType: 'StudentProfile',
                    entityId: request.studentProfileId,
                    before: { classId: request.fromClassId },
                    after: { classId: request.toClassId },
                }, tx);
            }
            return updated;
        });
        return result;
    }
};
exports.ClassChangeRequestsService = ClassChangeRequestsService;
exports.ClassChangeRequestsService = ClassChangeRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ClassChangeRequestsService);
//# sourceMappingURL=class-change-requests.service.js.map