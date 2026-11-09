import { UpdateAssessmentDto } from '../dto/update-assessment.dto';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { AssessmentsService } from '../services/assessments.service';
import { CreateAssessmentDto } from '../dto/create-assessment.dto';
export declare class AssessmentsController {
    private readonly assessmentsService;
    constructor(assessmentsService: AssessmentsService);
    createExercise(user: AuthenticatedUser, chapterId: string, dto: CreateAssessmentDto): Promise<{
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
    createQuiz(user: AuthenticatedUser, chapterId: string, dto: CreateAssessmentDto): Promise<{
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
    update(user: AuthenticatedUser, id: string, dto: UpdateAssessmentDto): Promise<{
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
    publish(user: AuthenticatedUser, id: string): Promise<{
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
    archive(user: AuthenticatedUser, id: string): Promise<{
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
