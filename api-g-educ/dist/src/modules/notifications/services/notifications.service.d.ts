import { NotificationType } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { PushService } from '../../../common/push/push.service';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import type { NotificationPayload } from '../interfaces/notification-payload.interface';
import type { ListNotificationsDto } from '../dto/list-notifications.dto';
export declare class NotificationsService {
    private readonly prisma;
    private readonly pushService;
    private readonly logger;
    constructor(prisma: PrismaService, pushService: PushService);
    private isEnabled;
    notifyUsers(userIds: string[], payload: NotificationPayload): Promise<{
        created: number;
        pushSent: number;
    }>;
    notifyStreakReminders(today: Date, currentTime: string): Promise<{
        created: number;
        pushSent: number;
        skipped: boolean;
    }>;
    notifyClass(classId: string, payload: NotificationPayload): Promise<{
        created: number;
        pushSent: number;
    }>;
    list(user: AuthenticatedUser, dto: ListNotificationsDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            title: string;
            type: NotificationType;
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
    markAsRead(user: AuthenticatedUser, notificationId: string): Promise<{
        message: string;
        updated: boolean;
    }>;
    markAllAsRead(user: AuthenticatedUser): Promise<{
        message: string;
        updatedCount: number;
    }>;
    private toPushData;
}
