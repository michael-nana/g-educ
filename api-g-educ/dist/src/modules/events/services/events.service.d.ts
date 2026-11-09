import { ContentStatus } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuditService } from '../../audit/services/audit.service';
import { TeacherScopeService } from '../../academics/services/teacher-scope.service';
import { NotificationsService } from '../../notifications/services/notifications.service';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import type { CreateEventDto } from '../dto/create-event.dto';
import type { UpdateEventDto } from '../dto/update-event.dto';
import type { EventFilterDto } from '../dto/event-filter.dto';
export declare class EventsService {
    private readonly prisma;
    private readonly auditService;
    private readonly teacherScope;
    private readonly notificationsService;
    private readonly logger;
    constructor(prisma: PrismaService, auditService: AuditService, teacherScope: TeacherScopeService, notificationsService: NotificationsService);
    private buildReminderDates;
    private assertCanManageEvent;
    private validateDates;
    create(user: AuthenticatedUser, dto: CreateEventDto): Promise<{
        id: string;
        createdAt: Date;
        classId: string;
        subjectId: string | null;
        status: ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        createdById: string;
        type: import("../../../generated/prisma/enums").EventType;
        startsAt: Date;
        endsAt: Date | null;
    }>;
    update(user: AuthenticatedUser, eventId: string, dto: UpdateEventDto): Promise<{
        id: string;
        createdAt: Date;
        classId: string;
        subjectId: string | null;
        status: ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        createdById: string;
        type: import("../../../generated/prisma/enums").EventType;
        startsAt: Date;
        endsAt: Date | null;
    }>;
    archive(user: AuthenticatedUser, eventId: string): Promise<{
        id: string;
        createdAt: Date;
        classId: string;
        subjectId: string | null;
        status: ContentStatus;
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
        status: ContentStatus;
        updatedAt: Date;
        title: string;
        description: string | null;
        createdById: string;
        type: import("../../../generated/prisma/enums").EventType;
        startsAt: Date;
        endsAt: Date | null;
    })[]>;
}
