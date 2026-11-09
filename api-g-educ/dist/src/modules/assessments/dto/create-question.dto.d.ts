import { QuestionType } from '../../../generated/prisma/client';
import { CreateQuestionOptionDto } from './create-question-option.dto';
export declare class CreateQuestionDto {
    type: QuestionType;
    statement: string;
    explanation?: string;
    imageKey?: string;
    points?: number;
    position?: number;
    options: CreateQuestionOptionDto[];
}
