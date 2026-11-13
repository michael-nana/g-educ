export type DashboardPeriod = 14 | 30 | 365;

export interface DashboardActivityDay {
  date: string;
  activeStudents: number;
}

export interface DashboardActiveClass {
  code: string;
  label: string;
  totalStudents: number;
  activeStudents: number;
  activityRate: number;
}

export interface DashboardEvent {
  title: string;
  type: "EXAMEN" | "DEVOIR" | "AUTRE";
  startsAt: string;
  class: {
    code: string;
    label: string;
  };
  subject: {
    name: string;
  } | null;
}

export interface DashboardStats {
  generatedAt: string;
  periodDays: DashboardPeriod;
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
  activity: DashboardActivityDay[];
  topClasses: DashboardActiveClass[];
  upcomingEvents: DashboardEvent[];
}
