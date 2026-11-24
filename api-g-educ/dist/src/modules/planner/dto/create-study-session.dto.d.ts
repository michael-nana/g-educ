import { Recurrence } from '../../../generated/prisma/client';
export declare class CreateStudySessionDto {
    clientId: string;
    title: string;
    subjectId?: string;
    startsAt: string;
    endsAt: string;
    recurrence?: Recurrence;
    recurrenceEndsOn?: string;
    reminderMinutesBefore?: number;
}
