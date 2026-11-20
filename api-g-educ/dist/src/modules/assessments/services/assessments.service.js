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
const crypto_1 = require("crypto");
const file_type_1 = require("file-type");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
const audit_actions_constants_1 = require("../../audit/constants/audit-actions.constants");
const teacher_scope_service_1 = require("../../academics/services/teacher-scope.service");
const common_2 = require("@nestjs/common");
const gamification_service_1 = require("../../gamification/services/gamification.service");
const upload_service_1 = require("../../../common/upload/upload.service");
let AssessmentsService = class AssessmentsService {
    prisma;
    auditService;
    teacherScope;
    gamificationService;
    uploadService;
    constructor(prisma, auditService, teacherScope, gamificationService, uploadService) {
        this.prisma = prisma;
        this.auditService = auditService;
        this.teacherScope = teacherScope;
        this.gamificationService = gamificationService;
        this.uploadService = uploadService;
    }
    async uploadExerciseFile(user, assessmentId, fileType, file) {
        if (!['EXERCISE', 'CORRECTION'].includes(fileType)) {
            throw new common_1.BadRequestException('Type de fichier invalide');
        }
        if (!file?.buffer?.length) {
            throw new common_1.BadRequestException('Sélectionnez un fichier PDF');
        }
        if (file.size > 20 * 1024 * 1024) {
            throw new common_1.BadRequestException('Le PDF ne doit pas dépasser 20 Mo');
        }
        const detected = await (0, file_type_1.fileTypeFromBuffer)(file.buffer);
        if (detected?.mime !== 'application/pdf') {
            throw new common_1.BadRequestException('Le fichier sélectionné n’est pas un PDF valide');
        }
        const assessment = await this.prisma.assessment.findUnique({
            where: { id: assessmentId },
            include: { chapter: { select: { classSubjectId: true } } },
        });
        if (!assessment)
            throw new common_1.NotFoundException('Évaluation introuvable');
        await this.teacherScope.assertCanManage(user, assessment.chapter.classSubjectId);
        if (assessment.kind !== 'EXERCICE' || assessment.exerciseFormat !== 'PDF') {
            throw new common_1.BadRequestException('Ces fichiers sont réservés aux exercices PDF');
        }
        if (assessment.status !== 'BROUILLON') {
            throw new common_1.BadRequestException('Seuls les brouillons peuvent recevoir des fichiers');
        }
        const key = `assessments/${assessment.classId}/${assessment.id}/${fileType.toLowerCase()}/${(0, crypto_1.randomUUID)()}.pdf`;
        const name = file.originalname.replace(/[\\/:*?"<>|]/g, '_').trim().slice(0, 200) || 'document.pdf';
        await this.uploadService.uploadFile({ storageKey: key, buffer: file.buffer, mimeType: 'application/pdf' });
        const oldKey = fileType === 'EXERCISE' ? assessment.exercisePdfKey : assessment.correctionPdfKey;
        try {
            await this.prisma.assessment.update({
                where: { id: assessmentId },
                data: fileType === 'EXERCISE'
                    ? { exercisePdfKey: key, exercisePdfName: name }
                    : { correctionPdfKey: key, correctionPdfName: name },
            });
        }
        catch (error) {
            await this.uploadService.deleteFile(key).catch(() => undefined);
            throw error;
        }
        if (oldKey)
            await this.uploadService.deleteFile(oldKey).catch(() => undefined);
        return { fileType, name };
    }
    async getExerciseCorrection(user, assessmentId) {
        if (user.role !== 'ELEVE' || !user.classId) {
            throw new common_1.ForbiddenException('Cette correction est réservée aux élèves');
        }
        const assessment = await this.prisma.assessment.findFirst({
            where: {
                id: assessmentId,
                classId: user.classId,
                kind: 'EXERCICE',
                exerciseFormat: 'PDF',
                status: 'PUBLIE',
                chapter: { status: 'PUBLIE' },
            },
            select: { correctionPdfKey: true, correctionPdfName: true },
        });
        if (!assessment?.correctionPdfKey)
            throw new common_1.NotFoundException('Correction introuvable');
        return {
            name: assessment.correctionPdfName ?? 'Correction.pdf',
            downloadUrl: await this.uploadService.createSignedDownloadUrl(assessment.correctionPdfKey, 300),
        };
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
        if (kind === 'QUIZ' && dto.exerciseFormat === 'PDF') {
            throw new common_1.BadRequestException('Les quiz doivent conserver leur format questions');
        }
        const exerciseFormat = kind === 'EXERCICE' ? dto.exerciseFormat ?? 'TEXTE' : 'TEXTE';
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
                    exerciseFormat,
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
    async findForManagement(user, chapterId) {
        if (!['ADMINISTRATEUR', 'ENSEIGNANT'].includes(user.role)) {
            throw new common_1.ForbiddenException('Vous n’êtes pas autorisé à consulter ces évaluations');
        }
        const chapter = await this.prisma.chapter.findUnique({
            where: { id: chapterId },
            select: { classSubjectId: true },
        });
        if (!chapter) {
            throw new common_1.NotFoundException('Chapitre introuvable');
        }
        await this.teacherScope.assertCanManage(user, chapter.classSubjectId);
        return this.prisma.assessment.findMany({
            where: { chapterId },
            include: {
                questions: {
                    orderBy: { position: 'asc' },
                    include: {
                        options: {
                            orderBy: { position: 'asc' },
                        },
                    },
                },
                _count: {
                    select: { attempts: true },
                },
            },
            orderBy: [{ position: 'asc' }, { createdAt: 'desc' }],
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
                questions: {
                    include: { options: true },
                    orderBy: { position: 'asc' },
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
            dto.position === undefined &&
            dto.exerciseFormat === undefined &&
            dto.questions === undefined) {
            throw new common_1.BadRequestException('Aucune modification fournie');
        }
        if (dto.title !== undefined && !dto.title.trim()) {
            throw new common_1.BadRequestException('Le titre de l’évaluation est obligatoire');
        }
        if (assessment.kind === 'QUIZ' && dto.exerciseFormat === 'PDF') {
            throw new common_1.BadRequestException('Les quiz doivent conserver leur format questions');
        }
        for (const question of dto.questions ?? []) {
            const correctCount = question.options.filter((option) => option.isCorrect).length;
            if (question.type === 'QCM_UNIQUE' && correctCount !== 1) {
                throw new common_1.BadRequestException('Une question QCM_UNIQUE doit avoir exactement une bonne réponse');
            }
            if (question.type === 'QCM_MULTIPLE' && correctCount < 1) {
                throw new common_1.BadRequestException('Une question QCM_MULTIPLE doit avoir au moins une bonne réponse');
            }
            if (question.type === 'VRAI_FAUX' &&
                (question.options.length !== 2 || correctCount !== 1)) {
                throw new common_1.BadRequestException('Une question VRAI_FAUX doit avoir exactement deux options et une seule bonne réponse');
            }
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
            ...(dto.exerciseFormat !== undefined && {
                exerciseFormat: dto.exerciseFormat,
            }),
        };
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.assessment.update({
                where: { id: assessmentId },
                data: {
                    ...data,
                    ...(dto.questions !== undefined && {
                        questions: {
                            deleteMany: {},
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
                    }),
                },
                include: {
                    questions: {
                        orderBy: { position: 'asc' },
                        include: {
                            options: {
                                orderBy: { position: 'asc' },
                            },
                        },
                    },
                    _count: {
                        select: { attempts: true },
                    },
                },
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
                    questionCount: assessment.questions.length,
                },
                after: {
                    title: updated.title,
                    instructions: updated.instructions,
                    durationSeconds: updated.durationSeconds,
                    passingPercent: updated.passingPercent,
                    position: updated.position,
                    status: updated.status,
                    questionCount: updated.questions.length,
                },
            }, tx);
            return updated;
        });
    }
    async findPublishedForStudent(user, filters) {
        if (user.role !== 'ELEVE') {
            throw new common_1.ForbiddenException('Cette fonctionnalité est réservée aux élèves');
        }
        if (!user.classId) {
            throw new common_1.NotFoundException('Classe de l’élève introuvable');
        }
        return this.prisma.assessment.findMany({
            where: {
                classId: user.classId,
                status: 'PUBLIE',
                chapter: {
                    status: 'PUBLIE',
                },
                ...(filters.chapterId
                    ? { chapterId: filters.chapterId }
                    : {}),
            },
            select: {
                id: true,
                kind: true,
                exerciseFormat: true,
                title: true,
                instructions: true,
                durationSeconds: true,
                passingPercent: true,
                position: true,
                version: true,
                publishedAt: true,
                chapter: {
                    select: {
                        id: true,
                        title: true,
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
                },
                _count: {
                    select: {
                        questions: true,
                    },
                },
            },
            orderBy: [
                { chapterId: 'asc' },
                { position: 'asc' },
                { createdAt: 'desc' },
            ],
        });
    }
    async findPublishedOneForStudent(user, assessmentId) {
        if (user.role !== 'ELEVE') {
            throw new common_1.ForbiddenException('Cette fonctionnalité est réservée aux élèves');
        }
        if (!user.classId) {
            throw new common_1.NotFoundException('Classe de l’élève introuvable');
        }
        const assessment = await this.prisma.assessment.findFirst({
            where: {
                id: assessmentId,
                classId: user.classId,
                status: 'PUBLIE',
                chapter: {
                    status: 'PUBLIE',
                },
            },
            select: {
                id: true,
                kind: true,
                exerciseFormat: true,
                title: true,
                instructions: true,
                exercisePdfKey: true,
                exercisePdfName: true,
                durationSeconds: true,
                passingPercent: true,
                position: true,
                version: true,
                publishedAt: true,
                chapter: {
                    select: {
                        id: true,
                        title: true,
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
                },
                questions: {
                    select: {
                        id: true,
                        type: true,
                        statement: true,
                        imageKey: true,
                        points: true,
                        position: true,
                        options: {
                            select: {
                                id: true,
                                label: true,
                                position: true,
                            },
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
        if (!assessment) {
            throw new common_1.NotFoundException('Évaluation introuvable');
        }
        const { exercisePdfKey, ...safeAssessment } = assessment;
        return {
            ...safeAssessment,
            exercisePdf: exercisePdfKey && assessment.exerciseFormat === 'PDF'
                ? {
                    name: assessment.exercisePdfName ?? 'Exercice.pdf',
                    downloadUrl: await this.uploadService.createSignedDownloadUrl(exercisePdfKey, 300),
                }
                : null,
            questions: assessment.questions.map((question) => ({
                ...question,
                options: assessment.kind === 'EXERCICE' ? [] : question.options,
            })),
        };
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
        if (assessment.kind === 'EXERCICE' && assessment.exerciseFormat === 'PDF') {
            if (!assessment.exercisePdfKey || !assessment.correctionPdfKey) {
                throw new common_1.BadRequestException('Ajoutez le PDF de l’exercice et son PDF de correction avant publication');
            }
        }
        else if (assessment.questions.length === 0) {
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
    async submitAttempt(user, assessmentId, dto) {
        if (user.role !== 'ELEVE') {
            throw new common_1.ForbiddenException('Seuls les élèves peuvent soumettre une évaluation');
        }
        if (!user.classId) {
            throw new common_1.NotFoundException('Classe de l’élève introuvable');
        }
        if (new Set(dto.answers.map((answer) => answer.questionId)).size !==
            dto.answers.length) {
            throw new common_1.BadRequestException('Une question ne peut apparaître qu’une seule fois dans la soumission');
        }
        const existing = await this.prisma.attempt.findUnique({
            where: {
                userId_clientId: {
                    userId: user.id,
                    clientId: dto.clientId,
                },
            },
            select: {
                id: true,
                assessmentId: true,
                status: true,
            },
        });
        if (existing) {
            if (existing.assessmentId !== assessmentId) {
                throw new common_2.ConflictException('Ce clientId est déjà utilisé pour une autre évaluation');
            }
            if (existing.status !== 'TERMINEE') {
                throw new common_2.ConflictException('Une tentative existe déjà mais elle n’est pas terminée');
            }
            return this.findMyAttemptById(user, existing.id);
        }
        const requestedStartedAt = new Date(dto.startedAt);
        const submittedAt = new Date();
        if (Number.isNaN(requestedStartedAt.getTime())) {
            throw new common_1.BadRequestException('Date de début invalide');
        }
        const futureToleranceMilliseconds = 5 * 60 * 1000;
        if (requestedStartedAt.getTime() >
            submittedAt.getTime() + futureToleranceMilliseconds) {
            throw new common_1.BadRequestException('La date de début ne peut pas être dans le futur');
        }
        const startedAt = requestedStartedAt.getTime() > submittedAt.getTime()
            ? submittedAt
            : requestedStartedAt;
        const elapsedMilliseconds = submittedAt.getTime() - startedAt.getTime();
        const maxOfflineMilliseconds = 48 * 60 * 60 * 1000;
        if (elapsedMilliseconds > maxOfflineMilliseconds) {
            throw new common_1.BadRequestException('La tentative dépasse le délai maximal de soumission de 48 heures');
        }
        const assessment = await this.prisma.assessment.findFirst({
            where: {
                id: assessmentId,
                classId: user.classId,
                status: 'PUBLIE',
                chapter: {
                    status: 'PUBLIE',
                },
            },
            include: {
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
        if (assessment.questions.length === 0) {
            throw new common_1.BadRequestException('Cette évaluation ne contient aucune question');
        }
        if (assessment.durationSeconds !== null &&
            elapsedMilliseconds > assessment.durationSeconds * 1000) {
            throw new common_1.BadRequestException('Le temps autorisé pour cette évaluation est dépassé');
        }
        const submittedAnswers = new Map(dto.answers.map((answer) => [
            answer.questionId,
            { optionIds: answer.optionIds, responseText: answer.responseText?.trim() ?? '' },
        ]));
        const questionIds = new Set(assessment.questions.map((question) => question.id));
        for (const answer of dto.answers) {
            if (!questionIds.has(answer.questionId)) {
                throw new common_1.BadRequestException('Une réponse contient une question étrangère à cette évaluation');
            }
        }
        let score = 0;
        const maxScore = assessment.questions.reduce((total, question) => total + question.points, 0);
        const correctedAnswers = assessment.questions.map((question) => {
            const submitted = submittedAnswers.get(question.id);
            const selectedOptionIds = submitted?.optionIds ?? [];
            const responseText = submitted?.responseText ?? '';
            const availableOptionIds = new Set(question.options.map((option) => option.id));
            for (const optionId of selectedOptionIds) {
                if (!availableOptionIds.has(optionId)) {
                    throw new common_1.BadRequestException('Une option sélectionnée ne correspond pas à sa question');
                }
            }
            const correctOptionIds = question.options
                .filter((option) => option.isCorrect)
                .map((option) => option.id);
            const selectedSet = new Set(selectedOptionIds);
            const correctSet = new Set(correctOptionIds);
            const isCorrect = assessment.kind === 'EXERCICE'
                ? responseText.trim().toLocaleLowerCase() ===
                    (question.options.find((option) => option.isCorrect)?.label ?? '')
                        .trim()
                        .toLocaleLowerCase()
                : selectedSet.size === correctSet.size &&
                    [...correctSet].every((id) => selectedSet.has(id));
            const pointsAwarded = isCorrect ? question.points : 0;
            score += pointsAwarded;
            return {
                questionId: question.id,
                selectedOptionIds,
                responseText,
                isCorrect,
                pointsAwarded,
            };
        });
        const durationSeconds = Math.floor(elapsedMilliseconds / 1000);
        let attemptId;
        try {
            attemptId = await this.prisma.$transaction(async (tx) => {
                const attempt = await tx.attempt.create({
                    data: {
                        userId: user.id,
                        assessmentId: assessment.id,
                        assessmentVersion: assessment.version,
                        clientId: dto.clientId,
                        status: 'TERMINEE',
                        startedAt,
                        submittedAt,
                        score,
                        maxScore,
                        durationSeconds,
                    },
                });
                for (const answer of correctedAnswers) {
                    await tx.attemptAnswer.create({
                        data: {
                            attemptId: attempt.id,
                            questionId: answer.questionId,
                            isCorrect: answer.isCorrect,
                            pointsAwarded: answer.pointsAwarded,
                            responseText: answer.responseText || null,
                            answeredAt: submittedAt,
                            options: {
                                create: answer.selectedOptionIds.map((optionId) => ({
                                    option: {
                                        connect: {
                                            id: optionId,
                                        },
                                    },
                                })),
                            },
                        },
                    });
                }
                await this.gamificationService.recordActivity(tx, {
                    userId: user.id,
                    clientId: dto.clientId,
                    type: assessment.kind === 'EXERCICE'
                        ? 'EXERCICE_TERMINE'
                        : 'QUIZ_TERMINE',
                    refType: 'ASSESSMENT',
                    refId: assessment.id,
                    occurredAt: submittedAt,
                });
                return attempt.id;
            });
        }
        catch (error) {
            if (typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'P2002') {
                const concurrentAttempt = await this.prisma.attempt.findUnique({
                    where: {
                        userId_clientId: {
                            userId: user.id,
                            clientId: dto.clientId,
                        },
                    },
                    select: {
                        id: true,
                        assessmentId: true,
                        status: true,
                    },
                });
                if (concurrentAttempt) {
                    if (concurrentAttempt.assessmentId !== assessmentId) {
                        throw new common_2.ConflictException('Ce clientId est déjà utilisé pour une autre évaluation');
                    }
                    if (concurrentAttempt.status === 'TERMINEE') {
                        return this.findMyAttemptById(user, concurrentAttempt.id);
                    }
                }
            }
            throw error;
        }
        return this.findMyAttemptById(user, attemptId);
    }
    async findMyAttempts(user, filters) {
        if (user.role !== 'ELEVE') {
            throw new common_1.ForbiddenException('Cette fonctionnalité est réservée aux élèves');
        }
        return this.prisma.attempt.findMany({
            where: {
                userId: user.id,
                status: 'TERMINEE',
                ...(filters.assessmentId
                    ? { assessmentId: filters.assessmentId }
                    : {}),
            },
            select: {
                id: true,
                assessmentId: true,
                assessmentVersion: true,
                status: true,
                startedAt: true,
                submittedAt: true,
                score: true,
                maxScore: true,
                durationSeconds: true,
                createdAt: true,
                assessment: {
                    select: {
                        id: true,
                        title: true,
                        kind: true,
                        passingPercent: true,
                        chapter: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                submittedAt: 'desc',
            },
        });
    }
    async findMyAttemptById(user, attemptId) {
        if (user.role !== 'ELEVE') {
            throw new common_1.ForbiddenException('Cette fonctionnalité est réservée aux élèves');
        }
        const attempt = await this.prisma.attempt.findFirst({
            where: {
                id: attemptId,
                userId: user.id,
                status: 'TERMINEE',
            },
            select: {
                id: true,
                assessmentId: true,
                assessmentVersion: true,
                status: true,
                startedAt: true,
                submittedAt: true,
                score: true,
                maxScore: true,
                durationSeconds: true,
                createdAt: true,
                assessment: {
                    select: {
                        id: true,
                        title: true,
                        kind: true,
                        passingPercent: true,
                        durationSeconds: true,
                        chapter: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                },
                answers: {
                    select: {
                        id: true,
                        isCorrect: true,
                        pointsAwarded: true,
                        responseText: true,
                        answeredAt: true,
                        question: {
                            select: {
                                id: true,
                                type: true,
                                statement: true,
                                explanation: true,
                                points: true,
                                position: true,
                                options: {
                                    select: {
                                        id: true,
                                        label: true,
                                        isCorrect: true,
                                        position: true,
                                    },
                                    orderBy: {
                                        position: 'asc',
                                    },
                                },
                            },
                        },
                        options: {
                            select: {
                                option: {
                                    select: {
                                        id: true,
                                        label: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Tentative introuvable');
        }
        return attempt;
    }
};
exports.AssessmentsService = AssessmentsService;
exports.AssessmentsService = AssessmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService,
        teacher_scope_service_1.TeacherScopeService,
        gamification_service_1.GamificationService,
        upload_service_1.UploadService])
], AssessmentsService);
//# sourceMappingURL=assessments.service.js.map