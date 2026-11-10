import { Recurrence } from '../../../generated/prisma/client';
export declare class UpdateStudySessionDto {
    title?: string;
    subjectId?: string | null;
    startsAt?: string;
    endsAt?: string;
    recurrence?: Recurrence;
    recurrenceEndsOn?: string | null;
    reminderMinutesBefore?: number;
    completedAt?: string | null;
}
