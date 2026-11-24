import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';
import { ProgressService } from './progress.service';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    findMyProgress(user: AuthenticatedUser): Promise<{
        summary: {
            progressPercent: number;
            totalLessons: number;
            completedLessons: number;
            totalSubjects: number;
            totalChapters: number;
            quizAverageScore: number | null;
            quizAttemptCount: number;
        };
        subjects: {
            totalChapters: number;
            averageScore: number | null;
            attemptCount: number;
            quizAverageScore: number | null;
            quizAttemptCount: number;
            chapters: {
                assessmentCount: number;
                averageScore: number | null;
                attemptCount: number;
                quizAverageScore: number | null;
                quizAttemptCount: number;
                totalLessons: number;
                completedLessons: number;
                trackedLessons: number;
                progressPercent: number;
                id: string;
                title: string;
                position: number;
            }[];
            totalLessons: number;
            completedLessons: number;
            trackedLessons: number;
            progressPercent: number;
            classSubjectId: string;
            subject: {
                id: string;
                name: string;
                slug: string;
            };
            coefficient: number | null;
        }[];
    }>;
    findMySubjectProgress(user: AuthenticatedUser, classSubjectId: string): Promise<{
        totalChapters: number;
        averageScore: number | null;
        attemptCount: number;
        quizAverageScore: number | null;
        quizAttemptCount: number;
        chapters: {
            assessmentCount: number;
            averageScore: number | null;
            attemptCount: number;
            quizAverageScore: number | null;
            quizAttemptCount: number;
            totalLessons: number;
            completedLessons: number;
            trackedLessons: number;
            progressPercent: number;
            id: string;
            title: string;
            position: number;
        }[];
        totalLessons: number;
        completedLessons: number;
        trackedLessons: number;
        progressPercent: number;
        classSubjectId: string;
        subject: {
            id: string;
            name: string;
            slug: string;
        };
        coefficient: number | null;
    }>;
}
