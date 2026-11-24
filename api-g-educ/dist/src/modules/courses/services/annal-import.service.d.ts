import { PrismaService } from '../../../prisma/prisma.service';
import { LessonsService } from './lessons.service';
import { AssessmentsService } from '../../assessments/services/assessments.service';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
export declare class AnnalImportService {
    private readonly prisma;
    private readonly lessonsService;
    private readonly assessmentsService;
    constructor(prisma: PrismaService, lessonsService: LessonsService, assessmentsService: AssessmentsService);
    private extractPages;
    importPdf(user: AuthenticatedUser, chapterId: string, file: Express.Multer.File): Promise<{
        lesson: {
            id: string;
            title: string;
        };
        extractedLessons: {
            id: string;
            title: string;
        }[];
        assessments: {
            id: string;
            title: string;
            kind: "EXERCICE" | "QUIZ";
        }[];
        pages: number;
        extractedCharacters: number;
        detectedExercises: number;
        detectedLessons: number;
        detectedChoiceQuestions: number;
        warning: string;
    }>;
}
