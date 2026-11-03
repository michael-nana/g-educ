import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { TeacherScopeService } from './teacher-scope.service';
import type { CreateChapterDto } from '../dto/create-chapter.dto';
import type { UpdateChapterDto } from '../dto/update-chapter.dto';
import type { ReorderChaptersDto } from '../dto/reorder-chapters.dto';
export declare class ChaptersService {
    private readonly prisma;
    private readonly auditService;
    private readonly teacherScope;
    constructor(prisma: PrismaService, auditService: AuditService, teacherScope: TeacherScopeService);
    create(user: {
        id: string;
        role: string;
    }, classSubjectId: string, dto: CreateChapterDto): Promise<{
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
    update(user: {
        id: string;
        role: string;
    }, chapterId: string, dto: UpdateChapterDto): Promise<{
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
    publish(user: {
        id: string;
        role: string;
        canPublish: boolean;
    }, chapterId: string): Promise<{
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
    archive(user: {
        id: string;
        role: string;
    }, chapterId: string): Promise<{
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
    reorder(user: {
        id: string;
        role: string;
    }, classSubjectId: string, dto: ReorderChaptersDto): Promise<{
        id: string;
        position: number;
        status: import("../../../generated/prisma/enums").ContentStatus;
        title: string;
    }[]>;
    findMyChapters(user: {
        id: string;
        role: string;
        classId: string | null;
    }, classSubjectId?: string): Promise<{
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
