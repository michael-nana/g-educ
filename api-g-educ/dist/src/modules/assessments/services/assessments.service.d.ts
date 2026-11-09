import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import type { UpdateAssessmentDto } from '../dto/update-assessment.dto';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';
import type { CreateAssessmentDto } from '../dto/create-assessment.dto';
export declare class AssessmentsService {
    private readonly prisma;
    private readonly auditService;
    private readonly teacherScope;
    constructor(prisma: PrismaService, auditService: AuditService, teacherScope: TeacherScopeService);
    create(user: {
        id: string;
        role: string;
    }, chapterId: string, dto: CreateAssessmentDto, kind: 'EXERCICE' | 'QUIZ'): Promise<{
        questions: ({
            options: {
                id: string;
                label: string;
                position: number;
                questionId: string;
                isCorrect: boolean;
            }[];
        } & {
            id: string;
            position: number;
            type: import("../../../generated/prisma/enums").QuestionType;
            assessmentId: string;
            statement: string;
            explanation: string | null;
            imageKey: string | null;
            points: number;
        })[];
    } & {
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
        durationSeconds: number | null;
        publishedById: string | null;
        kind: import("../../../generated/prisma/enums").AssessmentKind;
        instructions: string | null;
        passingPercent: number | null;
    }>;
    update(user: {
        id: string;
        role: string;
    }, assessmentId: string, dto: UpdateAssessmentDto): Promise<{
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
        durationSeconds: number | null;
        publishedById: string | null;
        kind: import("../../../generated/prisma/enums").AssessmentKind;
        instructions: string | null;
        passingPercent: number | null;
    }>;
    publish(user: {
        id: string;
        role: string;
        canPublish: boolean;
    }, assessmentId: string): Promise<{
        questions: ({
            options: {
                id: string;
                label: string;
                position: number;
                questionId: string;
                isCorrect: boolean;
            }[];
        } & {
            id: string;
            position: number;
            type: import("../../../generated/prisma/enums").QuestionType;
            assessmentId: string;
            statement: string;
            explanation: string | null;
            imageKey: string | null;
            points: number;
        })[];
    } & {
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
        durationSeconds: number | null;
        publishedById: string | null;
        kind: import("../../../generated/prisma/enums").AssessmentKind;
        instructions: string | null;
        passingPercent: number | null;
    }>;
    archive(user: {
        id: string;
        role: string;
        canPublish: boolean;
    }, assessmentId: string): Promise<{
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
        durationSeconds: number | null;
        publishedById: string | null;
        kind: import("../../../generated/prisma/enums").AssessmentKind;
        instructions: string | null;
        passingPercent: number | null;
    }>;
}
