import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { ChaptersService } from '../services/chapters.service';
import { CreateChapterDto } from '../dto/create-chapter.dto';
import { UpdateChapterDto } from '../dto/update-chapter.dto';
import { ReorderChaptersDto } from '../dto/reorder-chapters.dto';
export declare class ChaptersController {
    private readonly chaptersService;
    constructor(chaptersService: ChaptersService);
    create(user: AuthenticatedUser, classSubjectId: string, dto: CreateChapterDto): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        classSubjectId: string;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        version: number;
        createdById: string;
        publishedAt: Date | null;
    }>;
    update(user: AuthenticatedUser, id: string, dto: UpdateChapterDto): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        classSubjectId: string;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        version: number;
        createdById: string;
        publishedAt: Date | null;
    }>;
    publish(user: AuthenticatedUser, id: string): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        classSubjectId: string;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        version: number;
        createdById: string;
        publishedAt: Date | null;
    }>;
    archive(user: AuthenticatedUser, id: string): Promise<{
        id: string;
        createdAt: Date;
        position: number;
        classId: string;
        classSubjectId: string;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        version: number;
        createdById: string;
        publishedAt: Date | null;
    }>;
    reorder(user: AuthenticatedUser, classSubjectId: string, dto: ReorderChaptersDto): Promise<{
        id: string;
        position: number;
        status: import("../../../generated/prisma/enums").ContentStatus;
        title: string;
    }[]>;
    findMyChapters(user: AuthenticatedUser, classSubjectId?: string): Promise<{
        id: string;
        position: number;
        title: string;
        description: string | null;
        version: number;
        publishedAt: Date | null;
        classSubject: {
            id: string;
            subject: {
                id: string;
                name: string;
                slug: string;
            };
        };
    }[]>;
}
