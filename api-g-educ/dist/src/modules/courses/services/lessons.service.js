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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const file_type_1 = require("file-type");
const client_1 = require("../../../generated/prisma/client");
const client_2 = require("../../../generated/prisma/client");
const prisma_service_1 = require("../../../prisma/prisma.service");
const audit_service_1 = require("../../audit/services/audit.service");
const audit_actions_constants_1 = require("../../audit/constants/audit-actions.constants");
const teacher_scope_service_1 = require("../../academics/services/teacher-scope.service");
const gamification_service_1 = require("../../gamification/services/gamification.service");
const upload_service_1 = require("../../../common/upload/upload.service");
const MAX_PDF_SIZE = 20 * 1024 * 1024;
let LessonsService = class LessonsService {
    prisma;
    auditService;
    gamificationService;
    uploadService;
    teacherScopeService;
    constructor(prisma, auditService, gamificationService, uploadService, teacherScopeService) {
        this.prisma = prisma;
        this.auditService = auditService;
        this.gamificationService = gamificationService;
        this.uploadService = uploadService;
        this.teacherScopeService = teacherScopeService;
    }
    sanitizeMarkdown(value) {
        return (0, sanitize_html_1.default)(value, {
            allowedTags: [],
            allowedAttributes: {},
            disallowedTagsMode: 'discard',
        }).trim();
    }
    async findLessonOrFail(id) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id },
            include: {
                chapter: true,
            },
        });
        if (!lesson) {
            throw new common_1.NotFoundException('Leçon introuvable');
        }
        return lesson;
    }
    async assertLessonAccess(user, lessonId) {
        const lesson = await this.findLessonOrFail(lessonId);
        if (user.role === 'ELEVE') {
            if (!user.classId ||
                lesson.classId !== user.classId ||
                lesson.status !== client_2.ContentStatus.PUBLIE ||
                lesson.chapter.status !== client_2.ContentStatus.PUBLIE) {
                throw new common_1.NotFoundException('Leçon introuvable');
            }
            return lesson;
        }
        if (user.role === 'ADMINISTRATEUR' ||
            user.role === 'ENSEIGNANT') {
            await this.teacherScopeService.assertCanManage(user, lesson.chapter.classSubjectId);
            return lesson;
        }
        throw new common_1.ForbiddenException('Accès interdit à cette leçon');
    }
    async create(user, chapterId, dto) {
        const chapter = await this.prisma.chapter.findUnique({
            where: { id: chapterId },
        });
        if (!chapter) {
            throw new common_1.NotFoundException('Chapitre introuvable');
        }
        await this.teacherScopeService.assertCanManage(user, chapter.classSubjectId);
        if (!dto.title.trim()) {
            throw new common_1.BadRequestException('Le titre est obligatoire');
        }
        if (dto.type === client_2.LessonType.TEXTE) {
            if (!dto.contentMarkdown?.trim()) {
                throw new common_1.BadRequestException('Le contenu Markdown est obligatoire pour une leçon texte');
            }
        }
        if (dto.type === client_2.LessonType.VIDEO) {
            throw new common_1.BadRequestException('Les vidéos seront disponibles dans la phase 2');
        }
        const contentMarkdown = dto.type === client_2.LessonType.TEXTE
            ? this.sanitizeMarkdown(dto.contentMarkdown)
            : null;
        return this.prisma.$transaction(async (tx) => {
            const lesson = await tx.lesson.create({
                data: {
                    chapterId,
                    classId: chapter.classId,
                    title: dto.title.trim(),
                    type: dto.type,
                    contentMarkdown,
                    durationSeconds: null,
                    position: dto.position ?? 0,
                    status: client_2.ContentStatus.BROUILLON,
                    createdById: user.id,
                },
            });
            await this.auditService.log({
                action: 'LESSON_CREATED',
                entityType: 'Lesson',
                entityId: lesson.id,
                after: {
                    title: lesson.title,
                    type: lesson.type,
                    classId: lesson.classId,
                    chapterId: lesson.chapterId,
                },
            }, tx);
            return lesson;
        });
    }
    async update(user, lessonId, dto) {
        const lesson = await this.findLessonOrFail(lessonId);
        await this.teacherScopeService.assertCanManage(user, lesson.chapter.classSubjectId);
        if (lesson.status === client_2.ContentStatus.ARCHIVE) {
            throw new common_1.BadRequestException('Une leçon archivée ne peut pas être modifiée');
        }
        if (dto.title === undefined &&
            dto.contentMarkdown === undefined &&
            dto.position === undefined &&
            dto.durationSeconds === undefined) {
            throw new common_1.BadRequestException('Aucune modification fournie');
        }
        if (dto.title !== undefined && !dto.title.trim()) {
            throw new common_1.BadRequestException('Le titre est obligatoire');
        }
        if (lesson.type === client_2.LessonType.TEXTE &&
            dto.contentMarkdown !== undefined &&
            !dto.contentMarkdown.trim()) {
            throw new common_1.BadRequestException('Le contenu Markdown est obligatoire');
        }
        const data = {
            ...(dto.title !== undefined && {
                title: dto.title.trim(),
            }),
            ...(dto.contentMarkdown !== undefined && {
                contentMarkdown: this.sanitizeMarkdown(dto.contentMarkdown),
            }),
            ...(dto.position !== undefined && {
                position: dto.position,
            }),
            ...(dto.durationSeconds !== undefined && {
                durationSeconds: dto.durationSeconds,
            }),
            ...(lesson.status === client_2.ContentStatus.PUBLIE && {
                version: { increment: 1 },
            }),
        };
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.lesson.update({
                where: { id: lessonId },
                data,
            });
            await this.auditService.log({
                action: 'LESSON_UPDATED',
                entityType: 'Lesson',
                entityId: lessonId,
                before: {
                    title: lesson.title,
                    contentMarkdown: lesson.contentMarkdown,
                    position: lesson.position,
                    version: lesson.version,
                },
                after: {
                    title: updated.title,
                    contentMarkdown: updated.contentMarkdown,
                    position: updated.position,
                    version: updated.version,
                },
            }, tx);
            return updated;
        });
    }
    async uploadPdfAsset(user, lessonId, file) {
        if (!file) {
            throw new common_1.BadRequestException('Aucun fichier fourni.');
        }
        if (!file.buffer || file.buffer.length === 0) {
            throw new common_1.BadRequestException('Le fichier est vide ou invalide.');
        }
        if (file.size > MAX_PDF_SIZE) {
            throw new common_1.BadRequestException('Le fichier PDF ne doit pas dépasser 20 Mo.');
        }
        const fileType = await (0, file_type_1.fileTypeFromBuffer)(file.buffer);
        if (fileType?.mime !== 'application/pdf') {
            throw new common_1.BadRequestException('Le fichier fourni n’est pas un véritable PDF.');
        }
        const lesson = await this.findLessonOrFail(lessonId);
        await this.teacherScopeService.assertCanManage(user, lesson.chapter.classSubjectId);
        if (lesson.type !== client_2.LessonType.PDF) {
            throw new common_1.BadRequestException('Les fichiers PDF ne peuvent être ajoutés qu’aux leçons de type PDF.');
        }
        if (lesson.status === client_2.ContentStatus.ARCHIVE) {
            throw new common_1.BadRequestException('Impossible de modifier une leçon archivée.');
        }
        const storageKey = `pdf/${lesson.classId}/${(0, crypto_1.randomUUID)()}.pdf`;
        await this.uploadService.uploadFile({
            storageKey,
            buffer: file.buffer,
            mimeType: 'application/pdf',
        });
        try {
            return await this.prisma.$transaction(async (tx) => {
                const asset = await tx.lessonAsset.create({
                    data: {
                        lessonId: lesson.id,
                        kind: client_2.AssetKind.PDF,
                        storageKey,
                        mimeType: 'application/pdf',
                        sizeBytes: file.buffer.length,
                        processingStatus: client_1.AssetProcessingStatus.PRET,
                    },
                });
                if (lesson.status === client_2.ContentStatus.PUBLIE) {
                    await tx.lesson.update({
                        where: { id: lesson.id },
                        data: { version: { increment: 1 } },
                    });
                }
                await this.auditService.log({
                    action: audit_actions_constants_1.AUDIT_ACTIONS.ASSET_UPLOADED,
                    entityType: 'LESSON_ASSET',
                    entityId: asset.id,
                    after: {
                        lessonId: lesson.id,
                        kind: client_2.AssetKind.PDF,
                        sizeBytes: asset.sizeBytes,
                    },
                }, tx);
                return asset;
            });
        }
        catch (error) {
            try {
                await this.uploadService.deleteFile(storageKey);
            }
            catch {
            }
            throw error;
        }
    }
    async deleteAsset(user, lessonId, assetId) {
        const lesson = await this.findLessonOrFail(lessonId);
        await this.teacherScopeService.assertCanManage(user, lesson.chapter.classSubjectId);
        if (lesson.status === client_2.ContentStatus.ARCHIVE) {
            throw new common_1.BadRequestException('Impossible de modifier une leçon archivée.');
        }
        if (lesson.status === client_2.ContentStatus.PUBLIE) {
            throw new common_1.BadRequestException('Une ressource publiée ne peut pas être supprimée. Ajoutez une nouvelle ressource pour la remplacer.');
        }
        const asset = await this.prisma.lessonAsset.findFirst({
            where: {
                id: assetId,
                lessonId: lesson.id,
            },
        });
        if (!asset) {
            throw new common_1.NotFoundException('Ressource introuvable.');
        }
        await this.uploadService.deleteFile(asset.storageKey);
        return this.prisma.$transaction(async (tx) => {
            await tx.lessonAsset.delete({
                where: { id: asset.id },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.ASSET_DELETED,
                entityType: 'LESSON_ASSET',
                entityId: asset.id,
                before: {
                    lessonId: lesson.id,
                    kind: asset.kind,
                    sizeBytes: asset.sizeBytes,
                },
            }, tx);
            return {
                message: 'Ressource supprimée avec succès.',
            };
        });
    }
    async publish(user, lessonId) {
        const lesson = await this.findLessonOrFail(lessonId);
        await this.teacherScopeService.assertCanManage(user, lesson.chapter.classSubjectId);
        if (user.role !== 'ADMINISTRATEUR' &&
            !user.canPublish) {
            throw new common_1.ForbiddenException('Vous ne disposez pas du droit de publication');
        }
        if (lesson.status === client_2.ContentStatus.PUBLIE) {
            throw new common_1.BadRequestException('Cette leçon est déjà publiée');
        }
        if (lesson.status === client_2.ContentStatus.ARCHIVE) {
            throw new common_1.BadRequestException('Une leçon archivée ne peut pas être publiée');
        }
        if (lesson.chapter.status !== client_2.ContentStatus.PUBLIE) {
            throw new common_1.BadRequestException('Le chapitre doit être publié avant la leçon');
        }
        if (lesson.type === client_2.LessonType.TEXTE &&
            !lesson.contentMarkdown?.trim()) {
            throw new common_1.BadRequestException('Le contenu de la leçon est vide');
        }
        if (lesson.type === client_2.LessonType.PDF) {
            const pdf = await this.prisma.lessonAsset.findFirst({
                where: {
                    lessonId,
                    kind: client_2.AssetKind.PDF,
                    processingStatus: 'PRET',
                },
            });
            if (!pdf) {
                throw new common_1.BadRequestException('Un fichier PDF valide est obligatoire pour publier cette leçon');
            }
        }
        if (lesson.type === client_2.LessonType.VIDEO) {
            throw new common_1.BadRequestException('La publication des vidéos sera activée en phase 2');
        }
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.lesson.update({
                where: { id: lessonId },
                data: {
                    status: client_2.ContentStatus.PUBLIE,
                    publishedAt: new Date(),
                    publishedById: user.id,
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.LESSON_PUBLISHED,
                entityType: 'Lesson',
                entityId: lessonId,
                before: {
                    status: lesson.status,
                },
                after: {
                    status: updated.status,
                    publishedAt: updated.publishedAt?.toISOString(),
                    publishedById: updated.publishedById,
                },
            }, tx);
            return updated;
        });
    }
    async archive(user, lessonId) {
        const lesson = await this.findLessonOrFail(lessonId);
        await this.teacherScopeService.assertCanManage(user, lesson.chapter.classSubjectId);
        if (lesson.status === client_2.ContentStatus.ARCHIVE) {
            throw new common_1.BadRequestException('Cette leçon est déjà archivée');
        }
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.lesson.update({
                where: { id: lessonId },
                data: {
                    status: client_2.ContentStatus.ARCHIVE,
                },
            });
            await this.auditService.log({
                action: audit_actions_constants_1.AUDIT_ACTIONS.LESSON_ARCHIVED,
                entityType: 'Lesson',
                entityId: lessonId,
                before: {
                    status: lesson.status,
                },
                after: {
                    status: updated.status,
                },
            }, tx);
            return updated;
        });
    }
    async findAll(user, filters) {
        const where = {
            ...(filters.chapterId && {
                chapterId: filters.chapterId,
            }),
            ...(filters.classSubjectId && {
                chapter: {
                    classSubjectId: filters.classSubjectId,
                },
            }),
            ...(filters.type && {
                type: filters.type,
            }),
        };
        if (user.role === 'ELEVE') {
            if (!user.classId) {
                throw new common_1.NotFoundException('Aucune classe associée à votre profil');
            }
            where.classId = user.classId;
            where.status = client_2.ContentStatus.PUBLIE;
            where.chapter = {
                ...where.chapter,
                status: client_2.ContentStatus.PUBLIE,
            };
        }
        else if (user.role === 'ENSEIGNANT') {
            where.chapter = {
                ...where.chapter,
                classSubject: {
                    teachers: {
                        some: {
                            userId: user.id,
                        },
                    },
                },
            };
        }
        else if (user.role !== 'ADMINISTRATEUR') {
            throw new common_1.ForbiddenException();
        }
        if (filters.favorite === 'true') {
            where.favorites = {
                some: {
                    userId: user.id,
                },
            };
        }
        else if (filters.favorite === 'false') {
            where.favorites = {
                none: {
                    userId: user.id,
                },
            };
        }
        return this.prisma.lesson.findMany({
            where,
            orderBy: [
                { chapterId: 'asc' },
                { position: 'asc' },
            ],
            select: {
                id: true,
                chapterId: true,
                classId: true,
                title: true,
                type: true,
                position: true,
                status: true,
                version: true,
                durationSeconds: true,
                publishedAt: true,
                createdAt: true,
                chapter: {
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        classSubjectId: true,
                    },
                },
                _count: {
                    select: {
                        assets: true,
                    },
                },
            },
        });
    }
    async findOne(user, lessonId) {
        const lesson = await this.assertLessonAccess(user, lessonId);
        const assets = await this.prisma.lessonAsset.findMany({
            where: {
                lessonId,
                processingStatus: 'PRET',
            },
            select: {
                id: true,
                kind: true,
                mimeType: true,
                sizeBytes: true,
                durationSeconds: true,
                storageKey: true,
                createdAt: true,
            },
        });
        const assetsWithLinks = await Promise.all(assets.map(async (asset) => ({
            id: asset.id,
            kind: asset.kind,
            mimeType: asset.mimeType,
            sizeBytes: asset.sizeBytes,
            durationSeconds: asset.durationSeconds,
            createdAt: asset.createdAt,
            downloadUrl: await this.uploadService.createSignedDownloadUrl(asset.storageKey, 300),
        })));
        const progress = user.role === 'ELEVE'
            ? await this.prisma.lessonProgress.findUnique({
                where: {
                    userId_lessonId: {
                        userId: user.id,
                        lessonId,
                    },
                },
            })
            : null;
        return {
            id: lesson.id,
            chapterId: lesson.chapterId,
            title: lesson.title,
            type: lesson.type,
            contentMarkdown: lesson.contentMarkdown,
            durationSeconds: lesson.durationSeconds,
            position: lesson.position,
            status: lesson.status,
            version: lesson.version,
            publishedAt: lesson.publishedAt,
            assets: assetsWithLinks,
            myProgress: progress,
        };
    }
    async addFavorite(user, lessonId) {
        if (user.role !== 'ELEVE') {
            throw new common_1.ForbiddenException('Cette fonctionnalité est réservée aux élèves');
        }
        await this.assertLessonAccess(user, lessonId);
        await this.prisma.lessonFavorite.upsert({
            where: {
                userId_lessonId: {
                    userId: user.id,
                    lessonId,
                },
            },
            create: {
                userId: user.id,
                lessonId,
            },
            update: {},
        });
        return {
            lessonId,
            favorite: true,
        };
    }
    async removeFavorite(user, lessonId) {
        if (user.role !== 'ELEVE') {
            throw new common_1.ForbiddenException('Cette fonctionnalité est réservée aux élèves');
        }
        await this.assertLessonAccess(user, lessonId);
        await this.prisma.lessonFavorite.deleteMany({
            where: {
                userId: user.id,
                lessonId,
            },
        });
        return {
            lessonId,
            favorite: false,
        };
    }
    async updateProgress(user, lessonId, dto) {
        if (user.role !== 'ELEVE') {
            throw new common_1.ForbiddenException('Cette fonctionnalité est réservée aux élèves');
        }
        const lesson = await this.assertLessonAccess(user, lessonId);
        if (lesson.type === client_2.LessonType.PDF &&
            dto.lastPositionSeconds !== undefined) {
            throw new common_1.BadRequestException('La position de lecture est réservée aux vidéos');
        }
        if (lesson.type === client_2.LessonType.VIDEO &&
            dto.lastPositionSeconds !== undefined &&
            lesson.durationSeconds !== null &&
            dto.lastPositionSeconds > lesson.durationSeconds) {
            throw new common_1.BadRequestException('Position vidéo invalide');
        }
        const now = new Date();
        const result = await this.prisma.$transaction(async (tx) => {
            const existing = await tx.lessonProgress.findUnique({
                where: {
                    userId_lessonId: {
                        userId: user.id,
                        lessonId,
                    },
                },
            });
            const progressPercent = Math.max(existing?.progressPercent ?? 0, dto.progressPercent);
            const isComplete = lesson.type === client_2.LessonType.TEXTE
                ? progressPercent >= 100
                : lesson.type === client_2.LessonType.VIDEO &&
                    progressPercent >= 80;
            const newlyCompleted = isComplete && !existing?.completedAt;
            const progress = await tx.lessonProgress.upsert({
                where: {
                    userId_lessonId: {
                        userId: user.id,
                        lessonId,
                    },
                },
                create: {
                    userId: user.id,
                    lessonId,
                    progressPercent,
                    lastPositionSeconds: dto.lastPositionSeconds ?? null,
                    completedAt: isComplete ? now : null,
                },
                update: {
                    progressPercent,
                    ...(dto.lastPositionSeconds !== undefined && {
                        lastPositionSeconds: dto.lastPositionSeconds,
                    }),
                    ...(newlyCompleted && {
                        completedAt: now,
                    }),
                },
            });
            let activityResult = null;
            if (newlyCompleted) {
                activityResult = await this.gamificationService.recordActivity(tx, {
                    userId: user.id,
                    clientId: dto.clientId,
                    type: client_2.ActivityType.LECON_TERMINEE,
                    refType: client_2.ActivityRefType.LESSON,
                    refId: lessonId,
                    occurredAt: now,
                });
            }
            const streak = await tx.userStreak.findUnique({
                where: { userId: user.id },
            });
            return {
                progress,
                newlyCompleted,
                activity: activityResult,
                streak,
            };
        });
        return {
            progress: result.progress,
            completed: result.progress.completedAt !== null,
            newlyCompleted: result.newlyCompleted,
            activity: result.activity,
            streak: result.streak
                ? {
                    currentStreak: result.streak.currentStreak,
                    longestStreak: result.streak.longestStreak,
                    lastActiveDate: result.streak.lastActiveDate,
                }
                : {
                    currentStreak: 0,
                    longestStreak: 0,
                    lastActiveDate: null,
                },
        };
    }
    async findMyProgress(user) {
        if (user.role !== 'ELEVE') {
            throw new common_1.ForbiddenException('Cette fonctionnalité est réservée aux élèves');
        }
        if (!user.classId) {
            throw new common_1.NotFoundException('Aucune classe associée à votre profil');
        }
        return this.prisma.lessonProgress.findMany({
            where: {
                userId: user.id,
                lesson: {
                    classId: user.classId,
                    status: client_2.ContentStatus.PUBLIE,
                    chapter: {
                        status: client_2.ContentStatus.PUBLIE,
                    },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
            select: {
                progressPercent: true,
                lastPositionSeconds: true,
                completedAt: true,
                updatedAt: true,
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        type: true,
                        durationSeconds: true,
                        version: true,
                        chapter: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                },
            },
        });
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService,
        gamification_service_1.GamificationService,
        upload_service_1.UploadService,
        teacher_scope_service_1.TeacherScopeService])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map