import { CreateQuestionDto } from './create-question.dto';
export declare class UpdateAssessmentDto {
    title?: string;
    instructions?: string;
    durationSeconds?: number | null;
    passingPercent?: number | null;
    position?: number;
    questions?: CreateQuestionDto[];
}
