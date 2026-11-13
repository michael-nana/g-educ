import { DashboardQueryDto } from '../dto/dashboard-query.dto';
import { DashboardService } from '../services/dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
        activity: import("../services/dashboard.service").ActivityDay[];
        topClasses: import("../services/dashboard.service").ActiveClass[];
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
}
