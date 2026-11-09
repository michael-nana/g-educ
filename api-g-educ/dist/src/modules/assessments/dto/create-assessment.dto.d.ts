import { CreateQuestionDto } from './create-question.dto';
export declare class CreateAssessmentDto {
    title: string;
    instructions?: string;
    durationSeconds?: number;
    passingPercent?: number;
    position?: number;
    questions?: CreateQuestionDto[];
}
