import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { ListNotificationsDto } from '../dto/list-notifications.dto';
import { NotificationsService } from '../services/notifications.service';
export declare class MyNotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    list(user: AuthenticatedUser, dto: ListNotificationsDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            title: string;
            type: import("../../../generated/prisma/enums").NotificationType;
            sentAt: Date | null;
            body: string;
            data: import("@prisma/client/runtime/client").JsonValue;
            readAt: Date | null;
        }[];
        unreadCount: number;
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    markAllAsRead(user: AuthenticatedUser): Promise<{
        message: string;
        updatedCount: number;
    }>;
    markAsRead(user: AuthenticatedUser, id: string): Promise<{
        message: string;
        updated: boolean;
    }>;
}
