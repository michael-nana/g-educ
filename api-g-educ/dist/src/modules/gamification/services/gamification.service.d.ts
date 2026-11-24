import { ActivityRefType, ActivityType, Prisma } from '../../../generated/prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ActivityQueryDto } from '../dto/activity-query.dto';
type RecordActivityInput = {
    userId: string;
    clientId: string;
    type: ActivityType;
    refType: ActivityRefType;
    refId: string;
    occurredAt: Date;
};
type AuthenticatedStudent = {
    id: string;
    classId: string | null;
};
export declare class GamificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toUtcDay;
    private dateKey;
    private addDays;
    private differenceInDays;
    private validateOccurredAt;
    private isStreakActivity;
    private validateActivityReference;
    recordActivity(tx: Prisma.TransactionClient, input: RecordActivityInput): Promise<{
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
    recordActivityForUser(user: AuthenticatedStudent, input: RecordActivityInput): Promise<{
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
    recordServerActivity(tx: Prisma.TransactionClient, input: Omit<RecordActivityInput, 'clientId'>): Promise<{
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
    getStreak(userId: string): Promise<{
        currentStreak: number;
        longestStreak: number;
        lastActiveDate: Date | null;
    }>;
    getActivityCalendar(userId: string, query: ActivityQueryDto): Promise<{
        from: string;
        to: string;
        activeDays: string[];
        totalActiveDays: number;
    }>;
    recomputeStreak(userId: string): Promise<{
        currentStreak: number;
        longestStreak: number;
        lastActiveDate: Date | null;
    }>;
}
export {};
