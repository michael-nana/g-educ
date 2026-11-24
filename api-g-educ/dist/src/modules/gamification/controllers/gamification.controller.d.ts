import type { AuthenticatedUser } from '../../auth/decorators/current-user.decorator';
import { RecordActivityDto } from '../dto/record-activity.dto';
import { ActivityQueryDto } from '../dto/activity-query.dto';
import { GamificationService } from '../services/gamification.service';
export declare class MeGamificationController {
    private readonly gamificationService;
    constructor(gamificationService: GamificationService);
    getStreak(user: AuthenticatedUser): Promise<{
        currentStreak: number;
        longestStreak: number;
        lastActiveDate: Date | null;
    }>;
    getActivity(user: AuthenticatedUser, query: ActivityQueryDto): Promise<{
        from: string;
        to: string;
        activeDays: string[];
        totalActiveDays: number;
    }>;
}
export declare class ActivitiesController {
    private readonly gamificationService;
    constructor(gamificationService: GamificationService);
    recordActivity(user: AuthenticatedUser, dto: RecordActivityDto): Promise<{
        recorded: boolean;
        duplicate: boolean;
        streakUpdated: boolean;
        currentStreak?: undefined;
        longestStreak?: undefined;
    } | {
        recorded: boolean;
        duplicate: boolean;
        streakUpdated: boolean;
        currentStreak: number;
        longestStreak: number;
    }>;
}
