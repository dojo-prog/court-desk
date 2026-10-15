import { useQuery } from "@tanstack/react-query";
import { fetchDashboardOverview } from "../api/dashboard.api";

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboardOverview,

    staleTime: 20_000,
  });
};
