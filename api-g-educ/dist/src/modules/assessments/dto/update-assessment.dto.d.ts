import { CreateQuestionDto } from './create-question.dto';
import { ExerciseFormat } from '../../../generated/prisma/client';
export declare class UpdateAssessmentDto {
    exerciseFormat?: ExerciseFormat;
    title?: string;
    instructions?: string;
    durationSeconds?: number | null;
    passingPercent?: number | null;
    position?: number;
    questions?: CreateQuestionDto[];
}
