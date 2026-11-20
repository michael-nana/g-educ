import { CreateQuestionDto } from './create-question.dto';
import { ExerciseFormat } from '../../../generated/prisma/client';
export declare class CreateAssessmentDto {
    exerciseFormat?: ExerciseFormat;
    title: string;
    instructions?: string;
    durationSeconds?: number;
    passingPercent?: number;
    position?: number;
    questions?: CreateQuestionDto[];
}
