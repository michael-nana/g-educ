import { PrismaService } from '../../../prisma/prisma.service';
import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import type { UpdateNotificationPreferencesDto } from '../dto/update-notification-preferences.dto';
export declare class NotificationPreferencesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
