import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { AnnalImportService } from '../services/annal-import.service';
export declare class AnnalImportController {
    private readonly annalImportService;
    constructor(annalImportService: AnnalImportService);
    import(user: AuthenticatedUser, chapterId: string, file: Express.Multer.File): Promise<{
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
