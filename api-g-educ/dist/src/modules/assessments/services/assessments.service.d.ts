import { PrismaService } from '../../../prisma/prisma.service';
import { AssessmentFilterDto } from '../dto/assessment-filter.dto';
import { AuditService } from '../../audit/services/audit.service';
import type { UpdateAssessmentDto } from '../dto/update-assessment.dto';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';
import { AttemptFilterDto } from '../dto/attempt-filter.dto';
import { SubmitAttemptDto } from '../dto/submit-attempt.dto';
import { GamificationService } from '../../gamification/services/gamification.service';
import { UploadService } from '../../../common/upload/upload.service';
import type { CreateAssessmentDto } from '../dto/create-assessment.dto';
export declare class AssessmentsService {
    private readonly prisma;
    private readonly auditService;
    private readonly teacherScope;
    private readonly gamificationService;
    private readonly uploadService;
    constructor(prisma: PrismaService, auditService: AuditService, teacherScope: TeacherScopeService, gamificationService: GamificationService, uploadService: UploadService);
    uploadExerciseFile(user: {
        id: string;
        role: string;
    }, assessmentId: string, fileType: string, file: Express.Multer.File): Promise<{
        fileType: string;
        name: string;
    }>;
    getExerciseCorrection(user: {
        id: string;
        role: string;
        classId: string | null;
    }, assessmentId: string): Promise<{
        name: string;
        downloadUrl: string;
    }>;
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
        exerciseFormat: import("../../../generated/prisma/enums").ExerciseFormat;
        exercisePdfKey: string | null;
        exercisePdfName: string | null;
        correctionPdfKey: string | null;
        correctionPdfName: string | null;
        instructions: string | null;
        passingPercent: number | null;
    }>;
    findForManagement(user: {
        id: string;
        role: string;
    }, chapterId: string): Promise<({
        _count: {
            attempts: number;
        };
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
        exerciseFormat: import("../../../generated/prisma/enums").ExerciseFormat;
        exercisePdfKey: string | null;
        exercisePdfName: string | null;
        correctionPdfKey: string | null;
        correctionPdfName: string | null;
        instructions: string | null;
        passingPercent: number | null;
    })[]>;
    update(user: {
        id: string;
        role: string;
    }, assessmentId: string, dto: UpdateAssessmentDto): Promise<{
        _count: {
            attempts: number;
        };
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
        exerciseFormat: import("../../../generated/prisma/enums").ExerciseFormat;
        exercisePdfKey: string | null;
        exercisePdfName: string | null;
        correctionPdfKey: string | null;
        correctionPdfName: string | null;
        instructions: string | null;
        passingPercent: number | null;
    }>;
    findPublishedForStudent(user: {
        id: string;
        role: string;
        classId: string | null;
    }, filters: AssessmentFilterDto): Promise<{
        id: string;
        position: number;
        title: string;
        version: number;
        publishedAt: Date | null;
        durationSeconds: number | null;
        kind: import("../../../generated/prisma/enums").AssessmentKind;
        exerciseFormat: import("../../../generated/prisma/enums").ExerciseFormat;
        instructions: string | null;
        passingPercent: number | null;
        _count: {
            questions: number;
        };
        chapter: {
            id: string;
            title: string;
            classSubject: {
                id: string;
                subject: {
                    id: string;
                    name: string;
                    slug: string;
                };
            };
        };
    }[]>;
    findPublishedOneForStudent(user: {
        id: string;
        role: string;
        classId: string | null;
    }, assessmentId: string): Promise<{
        exercisePdf: {
            name: string;
            downloadUrl: string;
        } | null;
        questions: {
            options: {
                id: string;
                label: string;
                position: number;
            }[];
            id: string;
            position: number;
            type: import("../../../generated/prisma/enums").QuestionType;
            statement: string;
            imageKey: string | null;
            points: number;
        }[];
        id: string;
        position: number;
        title: string;
        version: number;
        publishedAt: Date | null;
        durationSeconds: number | null;
        kind: import("../../../generated/prisma/enums").AssessmentKind;
        exerciseFormat: import("../../../generated/prisma/enums").ExerciseFormat;
        exercisePdfName: string | null;
        instructions: string | null;
        passingPercent: number | null;
        chapter: {
            id: string;
            title: string;
            classSubject: {
                id: string;
                subject: {
                    id: string;
                    name: string;
                    slug: string;
                };
            };
        };
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
        exerciseFormat: import("../../../generated/prisma/enums").ExerciseFormat;
        exercisePdfKey: string | null;
        exercisePdfName: string | null;
        correctionPdfKey: string | null;
        correctionPdfName: string | null;
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
        exerciseFormat: import("../../../generated/prisma/enums").ExerciseFormat;
        exercisePdfKey: string | null;
        exercisePdfName: string | null;
        correctionPdfKey: string | null;
        correctionPdfName: string | null;
        instructions: string | null;
        passingPercent: number | null;
    }>;
    submitAttempt(user: {
        id: string;
        role: string;
        classId: string | null;
    }, assessmentId: string, dto: SubmitAttemptDto): Promise<{
        id: string;
        createdAt: Date;
        status: import("../../../generated/prisma/enums").AttemptStatus;
        durationSeconds: number | null;
        assessmentId: string;
        assessmentVersion: number;
        startedAt: Date;
        submittedAt: Date | null;
        score: number | null;
        maxScore: number | null;
        assessment: {
            id: string;
            title: string;
            durationSeconds: number | null;
            kind: import("../../../generated/prisma/enums").AssessmentKind;
            passingPercent: number | null;
            chapter: {
                id: string;
                title: string;
            };
        };
        answers: {
            id: string;
            isCorrect: boolean;
            pointsAwarded: number;
            responseText: string | null;
            answeredAt: Date;
            options: {
                option: {
                    id: string;
                    label: string;
                };
            }[];
            question: {
                id: string;
                position: number;
                type: import("../../../generated/prisma/enums").QuestionType;
                statement: string;
                explanation: string | null;
                points: number;
                options: {
                    id: string;
                    label: string;
                    position: number;
                    isCorrect: boolean;
                }[];
            };
        }[];
    }>;
    findMyAttempts(user: {
        id: string;
        role: string;
    }, filters: AttemptFilterDto): Promise<{
        id: string;
        createdAt: Date;
        status: import("../../../generated/prisma/enums").AttemptStatus;
        durationSeconds: number | null;
        assessmentId: string;
        assessmentVersion: number;
        startedAt: Date;
        submittedAt: Date | null;
        score: number | null;
        maxScore: number | null;
        assessment: {
            id: string;
            title: string;
            kind: import("../../../generated/prisma/enums").AssessmentKind;
            passingPercent: number | null;
            chapter: {
                id: string;
                title: string;
            };
        };
    }[]>;
    findMyAttemptById(user: {
        id: string;
        role: string;
    }, attemptId: string): Promise<{
        id: string;
        createdAt: Date;
        status: import("../../../generated/prisma/enums").AttemptStatus;
        durationSeconds: number | null;
        assessmentId: string;
        assessmentVersion: number;
        startedAt: Date;
        submittedAt: Date | null;
        score: number | null;
        maxScore: number | null;
        assessment: {
            id: string;
            title: string;
            durationSeconds: number | null;
            kind: import("../../../generated/prisma/enums").AssessmentKind;
            passingPercent: number | null;
            chapter: {
                id: string;
                title: string;
            };
        };
        answers: {
            id: string;
            isCorrect: boolean;
            pointsAwarded: number;
            responseText: string | null;
            answeredAt: Date;
            options: {
                option: {
                    id: string;
                    label: string;
                };
            }[];
            question: {
                id: string;
                position: number;
                type: import("../../../generated/prisma/enums").QuestionType;
                statement: string;
                explanation: string | null;
                points: number;
                options: {
                    id: string;
                    label: string;
                    position: number;
                    isCorrect: boolean;
                }[];
            };
        }[];
    }>;
}
