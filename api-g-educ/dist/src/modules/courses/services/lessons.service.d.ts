import { AssetProcessingStatus } from '../../../generated/prisma/client';
import { AssetKind, ContentStatus, LessonType } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';
import { GamificationService } from '../../gamification/services/gamification.service';
import { UploadService } from '../../../common/upload/upload.service';
import type { CreateLessonDto } from '../dto/create-lesson.dto';
import type { UpdateLessonDto } from '../dto/update-lesson.dto';
import type { LessonFilterDto } from '../dto/lesson-filter.dto';
import type { UpdateLessonProgressDto } from '../dto/update-lesson-progress.dto';
type CurrentUser = {
    id: string;
    role: string;
    classId: string | null;
    canPublish: boolean;
};
export declare class LessonsService {
    private readonly prisma;
    private readonly auditService;
    private readonly gamificationService;
    private readonly uploadService;
    private readonly teacherScopeService;
    constructor(prisma: PrismaService, auditService: AuditService, gamificationService: GamificationService, uploadService: UploadService, teacherScopeService: TeacherScopeService);
    private sanitizeMarkdown;
    private findLessonOrFail;
    private assertLessonAccess;
    create(user: CurrentUser, chapterId: string, dto: CreateLessonDto): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: ContentStatus;
        updatedAt: Date;
        title: string;
        version: number;
        createdById: string;
        publishedAt: Date | null;
        chapterId: string;
        type: LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        publishedById: string | null;
    }>;
    update(user: CurrentUser, lessonId: string, dto: UpdateLessonDto): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: ContentStatus;
        updatedAt: Date;
        title: string;
        version: number;
        createdById: string;
        publishedAt: Date | null;
        chapterId: string;
        type: LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        publishedById: string | null;
    }>;
    uploadPdfAsset(user: CurrentUser, lessonId: string, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        durationSeconds: number | null;
        lessonId: string;
        kind: AssetKind;
        quality: import("../../../generated/prisma/enums").VideoQuality | null;
        storageKey: string;
        mimeType: string;
        sizeBytes: number;
        processingStatus: AssetProcessingStatus;
    }>;
    deleteAsset(user: CurrentUser, lessonId: string, assetId: string): Promise<{
        message: string;
    }>;
    publish(user: CurrentUser, lessonId: string): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: ContentStatus;
        updatedAt: Date;
        title: string;
        version: number;
        createdById: string;
        publishedAt: Date | null;
        chapterId: string;
        type: LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        publishedById: string | null;
    }>;
    archive(user: CurrentUser, lessonId: string): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: ContentStatus;
        updatedAt: Date;
        title: string;
        version: number;
        createdById: string;
        publishedAt: Date | null;
        chapterId: string;
        type: LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        publishedById: string | null;
    }>;
    findAll(user: CurrentUser, filters: LessonFilterDto): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: ContentStatus;
        title: string;
        version: number;
        publishedAt: Date | null;
        chapterId: string;
        type: LessonType;
        durationSeconds: number | null;
        chapter: {
            id: string;
            classSubjectId: string;
            status: ContentStatus;
            title: string;
        };
        _count: {
            assets: number;
        };
    }[]>;
    findOne(user: CurrentUser, lessonId: string): Promise<{
        id: string;
        chapterId: string;
        title: string;
        type: LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        position: number;
        status: ContentStatus;
        version: number;
        publishedAt: Date | null;
        assets: {
            id: string;
            kind: AssetKind;
            mimeType: string;
            sizeBytes: number;
            durationSeconds: number | null;
            createdAt: Date;
            downloadUrl: string;
        }[];
        myProgress: {
            id: string;
            userId: string;
            updatedAt: Date;
            lessonId: string;
            progressPercent: number;
            lastPositionSeconds: number | null;
            completedAt: Date | null;
        } | null;
    }>;
    addFavorite(user: CurrentUser, lessonId: string): Promise<{
        lessonId: string;
        favorite: boolean;
    }>;
    removeFavorite(user: CurrentUser, lessonId: string): Promise<{
        lessonId: string;
        favorite: boolean;
    }>;
    updateProgress(user: CurrentUser, lessonId: string, dto: UpdateLessonProgressDto): Promise<{
        progress: {
            id: string;
            userId: string;
            updatedAt: Date;
            lessonId: string;
            progressPercent: number;
            lastPositionSeconds: number | null;
            completedAt: Date | null;
        };
        completed: boolean;
        newlyCompleted: boolean;
        activity: {
            recorded: boolean;
            duplicate: boolean;
            streakUpdated: boolean;
            currentStreak?: undefined;
            longestStreak?: undefined;
        } | {
            recorded: boolean;
            duplicate: boolean;
            streakUpdated: boolean;
            currentStreak: number;
            longestStreak: number;
        } | null;
        streak: {
            currentStreak: number;
            longestStreak: number;
            lastActiveDate: Date | null;
        };
    }>;
    findMyProgress(user: CurrentUser): Promise<{
        updatedAt: Date;
        progressPercent: number;
        lastPositionSeconds: number | null;
        completedAt: Date | null;
        lesson: {
            id: string;
            title: string;
            version: number;
            type: LessonType;
            durationSeconds: number | null;
            chapter: {
                id: string;
                title: string;
            };
        };
    }[]>;
}
export {};
