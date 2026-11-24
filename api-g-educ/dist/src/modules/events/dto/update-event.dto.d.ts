import { EventType } from '../../../generated/prisma/client';
export declare class UpdateEventDto {
    type?: EventType;
    title?: string;
    description?: string | null;
    subjectId?: string | null;
    startsAt?: string;
    endsAt?: string | null;
}
