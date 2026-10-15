import { api } from "@/lib/axios/client";
import type { FetchDashboardOverviewRes } from "../types/dashboard.types";

export const fetchDashboardOverview = async () => {
  const { data } = await api.get<FetchDashboardOverviewRes>("/v1/dashboard");

  return data.data;
};
