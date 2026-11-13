import { api } from "./api";
import type { DashboardPeriod, DashboardStats } from "./dashboard.types";

export const dashboardService = {
  async getStats(period: DashboardPeriod): Promise<DashboardStats> {
    const { data } = await api.get<DashboardStats>("/admin/dashboard", {
      params: { period },
    });
    return data;
  },
};
