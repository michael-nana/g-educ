import { LessonsService } from '../services/lessons.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { LessonFilterDto } from '../dto/lesson-filter.dto';
import { UpdateLessonProgressDto } from '../dto/update-lesson-progress.dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(user: any, chapterId: string, dto: CreateLessonDto): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        version: number;
        createdById: string;
        publishedAt: Date | null;
        chapterId: string;
        type: import("../../../generated/prisma/enums").LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        publishedById: string | null;
    }>;
    update(user: any, id: string, dto: UpdateLessonDto): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        version: number;
        createdById: string;
        publishedAt: Date | null;
        chapterId: string;
        type: import("../../../generated/prisma/enums").LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        publishedById: string | null;
    }>;
    uploadAsset(user: any, id: string, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        durationSeconds: number | null;
        lessonId: string;
        kind: import("../../../generated/prisma/enums").AssetKind;
        quality: import("../../../generated/prisma/enums").VideoQuality | null;
        storageKey: string;
        mimeType: string;
        sizeBytes: number;
        processingStatus: import("../../../generated/prisma/enums").AssetProcessingStatus;
    }>;
    deleteAsset(user: any, id: string, assetId: string): Promise<{
        message: string;
    }>;
    publish(user: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        version: number;
        createdById: string;
        publishedAt: Date | null;
        chapterId: string;
        type: import("../../../generated/prisma/enums").LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        publishedById: string | null;
    }>;
    archive(user: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        version: number;
        createdById: string;
        publishedAt: Date | null;
        chapterId: string;
        type: import("../../../generated/prisma/enums").LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        publishedById: string | null;
    }>;
    findAll(user: any, filters: LessonFilterDto): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        status: import("../../../generated/prisma/enums").ContentStatus;
        title: string;
        version: number;
        publishedAt: Date | null;
        chapterId: string;
        type: import("../../../generated/prisma/enums").LessonType;
        durationSeconds: number | null;
        chapter: {
            id: string;
            classSubjectId: string;
            status: import("../../../generated/prisma/enums").ContentStatus;
            title: string;
        };
        _count: {
            assets: number;
        };
    }[]>;
    findOne(user: any, id: string): Promise<{
        id: string;
        chapterId: string;
        title: string;
        type: import("../../../generated/prisma/enums").LessonType;
        contentMarkdown: string | null;
        durationSeconds: number | null;
        position: number;
        status: import("../../../generated/prisma/enums").ContentStatus;
        version: number;
        publishedAt: Date | null;
        assets: {
            id: string;
            kind: import("../../../generated/prisma/enums").AssetKind;
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
    addFavorite(user: any, id: string): Promise<{
        lessonId: string;
        favorite: boolean;
    }>;
    removeFavorite(user: any, id: string): Promise<{
        lessonId: string;
        favorite: boolean;
    }>;
    updateProgress(user: any, id: string, dto: UpdateLessonProgressDto): Promise<{
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
    findMyProgress(user: any): Promise<{
        updatedAt: Date;
        progressPercent: number;
        lastPositionSeconds: number | null;
        completedAt: Date | null;
        lesson: {
            id: string;
            title: string;
            version: number;
            type: import("../../../generated/prisma/enums").LessonType;
            durationSeconds: number | null;
            chapter: {
                id: string;
                title: string;
            };
        };
    }[]>;
}
