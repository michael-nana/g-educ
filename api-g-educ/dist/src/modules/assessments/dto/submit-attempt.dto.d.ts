import { SubmitAnswerDto } from './submit-answer.dto';
export declare class SubmitAttemptDto {
    clientId: string;
    startedAt: string;
    answers: SubmitAnswerDto[];
}
