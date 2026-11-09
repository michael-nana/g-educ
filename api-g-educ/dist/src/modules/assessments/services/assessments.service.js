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
exports.AssessmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
const audit_actions_constants_1 = require("../../audit/constants/audit-actions.constants");
const teacher_scope_service_1 = require("../../academics/services/teacher-scope.service");
let AssessmentsService = class AssessmentsService {
    prisma;
    auditService;
    teacherScope;
    constructor(prisma, auditService, teacherScope) {
        this.prisma = prisma;
        this.auditService = auditService;
        this.teacherScope = teacherScope;
    }
    async create(user, chapterId, dto, kind) {
        const chapter = await this.prisma.chapter.findUnique({
            where: { id: chapterId },
            select: {
                id: true,
                classId: true,
                classSubjectId: true,
                status: true,
            },
        });
        if (!chapter) {
            throw new common_1.NotFoundException('Chapitre introuvable');
        }
        if (chapter.status === 'ARCHIVE') {
            throw new common_1.BadRequestException('Impossible de créer une évaluation dans un chapitre archivé');
        }
        const classSubject = await this.teacherScope.assertCanManage(user, chapter.classSubjectId);
        if (classSubject.classId !== chapter.classId) {
            throw new common_1.NotFoundException('Chapitre introuvable');
        }
        const title = dto.title.trim();
        if (!title) {
            throw new common_1.BadRequestException('Le titre de l’évaluation est obligatoire');
        }
        for (const question of dto.questions ?? []) {
            const options = question.options;
            const correctCount = options.filter((option) => option.isCorrect).length;
            if (question.type === 'QCM_UNIQUE' && correctCount !== 1) {
                throw new common_1.BadRequestException('Une question QCM_UNIQUE doit avoir exactement une bonne réponse');
            }
            if (question.type === 'QCM_MULTIPLE' && correctCount < 1) {
                throw new common_1.BadRequestException('Une question QCM_MULTIPLE doit avoir au moins une bonne réponse');
            }
            if (question.type === 'VRAI_FAUX' &&
                (options.length !== 2 || correctCount !== 1)) {
                throw new common_1.BadRequestException('Une question VRAI_FAUX doit avoir exactement deux options et une seule bonne réponse');
            }
        }
        return this.prisma.$transaction(async (tx) => {
            const assessment = await tx.assessment.create({
                data: {
                    chapterId,
                    classId: chapter.classId,
                    kind,
                    title,
                    instructions: dto.instructions?.trim() || null,
                    durationSeconds: dto.durationSeconds ?? null,
                    passingPercent: dto.passingPercent ?? null,
                    position: dto.position ?? 0,
                    createdById: user.id,
                    ...(dto.questions?.length
                        ? {
                            questions: {
                                create: dto.questions.map((question, questionIndex) => ({
                                    type: question.type,
                                    statement: question.statement.trim(),
                                    explanation: question.explanation?.trim() || null,
                                    imageKey: question.imageKey ?? null,
                                    points: question.points ?? 1,
                                    position: question.position ?? questionIndex,
                                    options: {
                                        create: question.options.map((option, optionIndex) => ({
                                            label: option.label.trim(),
                                            isCorrect: option.isCorrect,
                                            position: option.position ?? optionIndex,
                                        })),
                                    },
                                })),
                            },
                        }
                        : {}),
                },
                include: {
                    questions: {
                        orderBy: {
                            position: 'asc',
                        },
                        include: {
                            options: {
                                orderBy: {
                                    position: 'asc',
                                },
                            },
                        },
                    },
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.ASSESSMENT_CREATED,
                entityType: 'Assessment',
                entityId: assessment.id,
                after: {
                    title: assessment.title,
                    kind: assessment.kind,
                    chapterId: assessment.chapterId,
                    classId: assessment.classId,
                    status: assessment.status,
                    questionCount: assessment.questions.length,
                },
            }, tx);
            return assessment;
        });
    }
    async update(user, assessmentId, dto) {
        const assessment = await this.prisma.assessment.findUnique({
            where: { id: assessmentId },
            include: {
                chapter: {
                    select: {
                        classSubjectId: true,
                        classId: true,
                    },
                },
            },
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Évaluation introuvable');
        }
        await this.teacherScope.assertCanManage(user, assessment.chapter.classSubjectId);
        if (assessment.status !== 'BROUILLON') {
            throw new common_1.BadRequestException('Seules les évaluations en brouillon peuvent être modifiées');
        }
        if (dto.title === undefined &&
            dto.instructions === undefined &&
            dto.durationSeconds === undefined &&
            dto.passingPercent === undefined &&
            dto.position === undefined) {
            throw new common_1.BadRequestException('Aucune modification fournie');
        }
        if (dto.title !== undefined && !dto.title.trim()) {
            throw new common_1.BadRequestException('Le titre de l’évaluation est obligatoire');
        }
        const data = {
            ...(dto.title !== undefined && {
                title: dto.title.trim(),
            }),
            ...(dto.instructions !== undefined && {
                instructions: dto.instructions.trim() || null,
            }),
            ...(dto.durationSeconds !== undefined && {
                durationSeconds: dto.durationSeconds,
            }),
            ...(dto.passingPercent !== undefined && {
                passingPercent: dto.passingPercent,
            }),
            ...(dto.position !== undefined && {
                position: dto.position,
            }),
        };
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.assessment.update({
                where: { id: assessmentId },
                data,
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.ASSESSMENT_UPDATED,
                entityType: 'Assessment',
                entityId: assessmentId,
                before: {
                    title: assessment.title,
                    instructions: assessment.instructions,
                    durationSeconds: assessment.durationSeconds,
                    passingPercent: assessment.passingPercent,
                    position: assessment.position,
                    status: assessment.status,
                },
                after: {
                    title: updated.title,
                    instructions: updated.instructions,
                    durationSeconds: updated.durationSeconds,
                    passingPercent: updated.passingPercent,
                    position: updated.position,
                    status: updated.status,
                },
            }, tx);
            return updated;
        });
    }
    async publish(user, assessmentId) {
        const assessment = await this.prisma.assessment.findUnique({
            where: { id: assessmentId },
            include: {
                chapter: {
                    select: {
                        classSubjectId: true,
                        classId: true,
                    },
                },
                questions: {
                    include: {
                        options: true,
                    },
                    orderBy: {
                        position: 'asc',
                    },
                },
            },
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Évaluation introuvable');
        }
        if (user.role !== 'ADMINISTRATEUR' &&
            (user.role !== 'ENSEIGNANT' || !user.canPublish)) {
            throw new common_1.ForbiddenException('Vous n’êtes pas autorisé à publier une évaluation');
        }
        await this.teacherScope.assertCanManage(user, assessment.chapter.classSubjectId);
        if (assessment.status !== 'BROUILLON') {
            throw new common_1.BadRequestException('Seules les évaluations en brouillon peuvent être publiées');
        }
        if (assessment.questions.length === 0) {
            throw new common_1.BadRequestException('Une évaluation doit contenir au moins une question');
        }
        for (const question of assessment.questions) {
            const optionCount = question.options.length;
            const correctCount = question.options.filter((option) => option.isCorrect).length;
            if (question.type === 'QCM_UNIQUE') {
                if (optionCount < 2 || correctCount !== 1) {
                    throw new common_1.BadRequestException(`La question "${question.statement}" doit avoir au moins deux options et exactement une bonne réponse`);
                }
            }
            if (question.type === 'QCM_MULTIPLE') {
                if (optionCount < 2 || correctCount < 1) {
                    throw new common_1.BadRequestException(`La question "${question.statement}" doit avoir au moins deux options et une bonne réponse`);
                }
            }
            if (question.type === 'VRAI_FAUX') {
                if (optionCount !== 2 || correctCount !== 1) {
                    throw new common_1.BadRequestException(`La question "${question.statement}" doit avoir exactement deux options et une bonne réponse`);
                }
            }
        }
        return this.prisma.$transaction(async (tx) => {
            const published = await tx.assessment.update({
                where: { id: assessmentId },
                data: {
                    status: 'PUBLIE',
                    publishedById: user.id,
                    publishedAt: new Date(),
                },
                include: {
                    questions: {
                        include: {
                            options: {
                                orderBy: {
                                    position: 'asc',
                                },
                            },
                        },
                        orderBy: {
                            position: 'asc',
                        },
                    },
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.ASSESSMENT_PUBLISHED,
                entityType: 'Assessment',
                entityId: assessmentId,
                before: {
                    status: assessment.status,
                    publishedById: assessment.publishedById,
                    publishedAt: assessment.publishedAt,
                },
                after: {
                    status: published.status,
                    publishedById: published.publishedById,
                    publishedAt: published.publishedAt,
                    questionCount: published.questions.length,
                },
            }, tx);
            return published;
        });
    }
    async archive(user, assessmentId) {
        const assessment = await this.prisma.assessment.findUnique({
            where: { id: assessmentId },
            include: {
                chapter: {
                    select: {
                        classSubjectId: true,
                        classId: true,
                    },
                },
            },
        });
        if (!assessment) {
            throw new common_1.NotFoundException('Évaluation introuvable');
        }
        if (user.role !== 'ADMINISTRATEUR' &&
            (user.role !== 'ENSEIGNANT' || !user.canPublish)) {
            throw new common_1.ForbiddenException('Vous n’êtes pas autorisé à archiver une évaluation');
        }
        await this.teacherScope.assertCanManage(user, assessment.chapter.classSubjectId);
        if (assessment.status === 'ARCHIVE') {
            throw new common_1.BadRequestException('Cette évaluation est déjà archivée');
        }
        return this.prisma.$transaction(async (tx) => {
            const archived = await tx.assessment.update({
                where: { id: assessmentId },
                data: {
                    status: 'ARCHIVE',
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.ASSESSMENT_ARCHIVED,
                entityType: 'Assessment',
                entityId: assessmentId,
                before: {
                    title: assessment.title,
                    kind: assessment.kind,
                    status: assessment.status,
                    publishedById: assessment.publishedById,
                    publishedAt: assessment.publishedAt,
                },
                after: {
                    title: archived.title,
                    kind: archived.kind,
                    status: archived.status,
                    publishedById: archived.publishedById,
                    publishedAt: archived.publishedAt,
                },
            }, tx);
            return archived;
        });
    }
};
exports.AssessmentsService = AssessmentsService;
exports.AssessmentsService = AssessmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService,
        teacher_scope_service_1.TeacherScopeService])
], AssessmentsService);
//# sourceMappingURL=assessments.service.js.map