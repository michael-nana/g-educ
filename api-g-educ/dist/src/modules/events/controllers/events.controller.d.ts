import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventFilterDto } from '../dto/event-filter.dto';
import { EventsService } from '../services/events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(user: AuthenticatedUser, dto: CreateEventDto): Promise<{
        id: string;
        createdAt: Date;
        classId: string;
        subjectId: string | null;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        createdById: string;
        type: import("../../../generated/prisma/enums").EventType;
        startsAt: Date;
        endsAt: Date | null;
    }>;
    update(user: AuthenticatedUser, id: string, dto: UpdateEventDto): Promise<{
        id: string;
        createdAt: Date;
        classId: string;
        subjectId: string | null;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        createdById: string;
        type: import("../../../generated/prisma/enums").EventType;
        startsAt: Date;
        endsAt: Date | null;
    }>;
    archive(user: AuthenticatedUser, id: string): Promise<{
        id: string;
        createdAt: Date;
        classId: string;
        subjectId: string | null;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        createdById: string;
        type: import("../../../generated/prisma/enums").EventType;
        startsAt: Date;
        endsAt: Date | null;
    }>;
    findAll(user: AuthenticatedUser, filters: EventFilterDto): Promise<({
        class: {
            id: string;
            label: string;
            code: string;
        };
        subject: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        classId: string;
        subjectId: string | null;
        status: import("../../../generated/prisma/enums").ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        createdById: string;
        type: import("../../../generated/prisma/enums").EventType;
        startsAt: Date;
        endsAt: Date | null;
    })[]>;
}
