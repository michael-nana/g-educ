import { EventType } from '../../../generated/prisma/client';
export declare class CreateEventDto {
    classId: string;
    type: EventType;
    title: string;
    description?: string;
    subjectId?: string;
    startsAt: string;
    endsAt?: string;
}
