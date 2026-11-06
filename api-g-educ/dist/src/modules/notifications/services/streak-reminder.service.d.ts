import { NotificationsService } from './notifications.service';
export declare class StreakReminderService {
    private readonly notificationsService;
    private readonly logger;
    constructor(notificationsService: NotificationsService);
    sendReminders(): Promise<void>;
}
