import { PrismaService } from '../../../prisma/prisma.service';
import type { DashboardQueryDto } from '../dto/dashboard-query.dto';
export interface ActivityDay {
    date: string;
    activeStudents: number;
}
export interface ActiveClass {
    code: string;
    label: string;
    totalStudents: number;
    activeStudents: number;
    activityRate: number;
}
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStats(query: DashboardQueryDto): Promise<{
        generatedAt: string;
        periodDays: number;
        totals: {
            students: number;
            teachers: number;
            classes: number;
            publishedLessons: number;
            activeStreakDays: number;
        };
        today: {
            activeStudents: number;
            lessonsCompleted: number;
            exercisesSubmitted: number;
            quizzesSubmitted: number;
        };
        pending: {
            contributions: number;
            reports: number;
            classChanges: number;
        };
        activity: ActivityDay[];
        topClasses: ActiveClass[];
        upcomingEvents: {
            title: string;
            type: import("../../../generated/prisma/enums").EventType;
            startsAt: Date;
            class: {
                label: string;
                code: string;
            };
            subject: {
                name: string;
            } | null;
        }[];
    }>;
    private getActivityDays;
    private getActiveClasses;
}
