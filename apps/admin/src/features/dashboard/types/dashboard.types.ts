import type { ApiResponse } from "@/types/api.types";
import type { DashboardOverview } from "@courtdesk/shared";

// =======================================
// Response Shape
// =======================================

export type FetchDashboardOverviewRes = ApiResponse<DashboardOverview>;
