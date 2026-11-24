import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { UpdateNotificationPreferencesDto } from '../dto/update-notification-preferences.dto';
import { NotificationPreferencesService } from '../services/notification-preferences.service';
export declare class NotificationPreferencesController {
    private readonly preferencesService;
    constructor(preferencesService: NotificationPreferencesService);
    get(user: AuthenticatedUser): Promise<{
        updatedAt: Date;
        eventsEnabled: boolean;
        streakReminder: boolean;
        streakReminderTime: string;
        forumEnabled: boolean;
    }>;
    update(user: AuthenticatedUser, dto: UpdateNotificationPreferencesDto): Promise<{
        updatedAt: Date;
        eventsEnabled: boolean;
        streakReminder: boolean;
        streakReminderTime: string;
        forumEnabled: boolean;
    }>;
}
