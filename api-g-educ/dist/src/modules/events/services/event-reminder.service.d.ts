import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationsService } from '../../notifications/services/notifications.service';
export declare class EventReminderService {
    private readonly prisma;
    private readonly notificationsService;
    private readonly logger;
    private readonly maxAttempts;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    sendReminders(): Promise<void>;
}
