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
exports.ChaptersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
const audit_actions_constants_1 = require("../../audit/constants/audit-actions.constants");
const teacher_scope_service_1 = require("./teacher-scope.service");
let ChaptersService = class ChaptersService {
    prisma;
    auditService;
    teacherScope;
    constructor(prisma, auditService, teacherScope) {
        this.prisma = prisma;
        this.auditService = auditService;
        this.teacherScope = teacherScope;
    }
    async create(user, classSubjectId, dto) {
        const classSubject = await this.teacherScope.assertCanManage(user, classSubjectId);
        const title = dto.title.trim();
        if (!title) {
            throw new common_1.BadRequestException('Le titre est obligatoire');
        }
        return this.prisma.$transaction(async (tx) => {
            const chapter = await tx.chapter.create({
                data: {
                    classSubjectId,
                    classId: classSubject.classId,
                    title,
                    description: dto.description?.trim() || null,
                    position: dto.position ?? 0,
                    createdById: user.id,
                },
                select: {
                    id: true,
                    classSubjectId: true,
                    classId: true,
                    title: true,
                    description: true,
                    position: true,
                    status: true,
                    version: true,
                    createdById: true,
                    publishedAt: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.CHAPTER_CREATED,
                entityType: 'Chapter',
                entityId: chapter.id,
                after: {
                    title: chapter.title,
                    classId: chapter.classId,
                    classSubjectId: chapter.classSubjectId,
                },
            }, tx);
            return chapter;
        });
    }
    async update(user, chapterId, dto) {
        const chapter = await this.prisma.chapter.findUnique({
            where: { id: chapterId },
        });
        if (!chapter) {
            throw new common_1.NotFoundException('Chapitre introuvable');
        }
        await this.teacherScope.assertCanManage(user, chapter.classSubjectId);
        if (dto.title === undefined &&
            dto.description === undefined &&
            dto.position === undefined) {
            throw new common_1.BadRequestException('Aucune modification fournie');
        }
        const data = {
            ...(dto.title !== undefined && {
                title: dto.title.trim(),
            }),
            ...(dto.description !== undefined && {
                description: dto.description.trim() || null,
            }),
            ...(dto.position !== undefined && {
                position: dto.position,
            }),
            ...(chapter.status === 'PUBLIE' && {
                version: { increment: 1 },
            }),
        };
        if (dto.title !== undefined && !dto.title.trim()) {
            throw new common_1.BadRequestException('Le titre est obligatoire');
        }
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.chapter.update({
                where: { id: chapterId },
                data,
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.CHAPTER_UPDATED,
                entityType: 'Chapter',
                entityId: chapterId,
                before: {
                    title: chapter.title,
                    description: chapter.description,
                    position: chapter.position,
                    version: chapter.version,
                },
                after: {
                    title: updated.title,
                    description: updated.description,
                    position: updated.position,
                    version: updated.version,
                },
            }, tx);
            return updated;
        });
    }
    async publish(user, chapterId) {
        const chapter = await this.prisma.chapter.findUnique({
            where: { id: chapterId },
        });
        if (!chapter) {
            throw new common_1.NotFoundException('Chapitre introuvable');
        }
        await this.teacherScope.assertCanManage(user, chapter.classSubjectId);
        if (user.role !== 'ADMINISTRATEUR' &&
            !user.canPublish) {
            throw new common_1.BadRequestException('Vous ne disposez pas du droit de publication');
        }
        if (chapter.status === 'PUBLIE') {
            throw new common_1.BadRequestException('Ce chapitre est déjà publié');
        }
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.chapter.update({
                where: { id: chapterId },
                data: {
                    status: 'PUBLIE',
                    publishedAt: new Date(),
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.CHAPTER_PUBLISHED,
                entityType: 'Chapter',
                entityId: chapterId,
                before: {
                    status: chapter.status,
                },
                after: {
                    status: updated.status,
                    publishedAt: updated.publishedAt?.toISOString(),
                },
            }, tx);
            return updated;
        });
    }
    async archive(user, chapterId) {
        const chapter = await this.prisma.chapter.findUnique({
            where: { id: chapterId },
        });
        if (!chapter) {
            throw new common_1.NotFoundException('Chapitre introuvable');
        }
        await this.teacherScope.assertCanManage(user, chapter.classSubjectId);
        if (chapter.status === 'ARCHIVE') {
            throw new common_1.BadRequestException('Ce chapitre est déjà archivé');
        }
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.chapter.update({
                where: { id: chapterId },
                data: {
                    status: 'ARCHIVE',
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.CHAPTER_ARCHIVED,
                entityType: 'Chapter',
                entityId: chapterId,
                before: {
                    status: chapter.status,
                },
                after: {
                    status: updated.status,
                },
            }, tx);
            return updated;
        });
    }
    async reorder(user, classSubjectId, dto) {
        await this.teacherScope.assertCanManage(user, classSubjectId);
        const chapters = await this.prisma.chapter.findMany({
            where: { classSubjectId },
            select: {
                id: true,
                position: true,
            },
        });
        const requestedIds = dto.chapterIds;
        if (chapters.length !== requestedIds.length ||
            chapters.some((chapter) => !requestedIds.includes(chapter.id))) {
            throw new common_1.BadRequestException('La liste doit contenir exactement tous les chapitres de cette matière');
        }
        await this.prisma.$transaction(async (tx) => {
            for (const [index, id] of requestedIds.entries()) {
                await tx.chapter.update({
                    where: { id },
                    data: { position: index },
                });
            }
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.CHAPTERS_REORDERED,
                entityType: 'ClassSubject',
                entityId: classSubjectId,
                after: {
                    chapterIds: requestedIds,
                },
            }, tx);
        });
        return this.prisma.chapter.findMany({
            where: { classSubjectId },
            orderBy: { position: 'asc' },
            select: {
                id: true,
                title: true,
                position: true,
                status: true,
            },
        });
    }
    async findMyChapters(user, classSubjectId) {
        if (user.role !== 'ELEVE') {
            throw new common_1.BadRequestException('Cette fonctionnalité est réservée aux élèves');
        }
        if (!user.classId) {
            throw new common_1.NotFoundException('Aucune classe associée à votre profil');
        }
        return this.prisma.chapter.findMany({
            where: {
                classId: user.classId,
                status: 'PUBLIE',
                ...(classSubjectId && { classSubjectId }),
            },
            select: {
                id: true,
                title: true,
                description: true,
                position: true,
                version: true,
                publishedAt: true,
                classSubject: {
                    select: {
                        id: true,
                        subject: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                            },
                        },
                    },
                },
            },
            orderBy: [
                { classSubjectId: 'asc' },
                { position: 'asc' },
            ],
        });
    }
};
exports.ChaptersService = ChaptersService;
exports.ChaptersService = ChaptersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService,
        teacher_scope_service_1.TeacherScopeService])
], ChaptersService);
//# sourceMappingURL=chapters.service.js.map