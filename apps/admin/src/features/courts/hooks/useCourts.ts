import type { CourtQuery } from "@courtdesk/shared";
import { useQuery } from "@tanstack/react-query";
import { fetchCourts } from "../api/court.api";

export const useCourts = (params: CourtQuery) => {
  return useQuery({
    queryKey: ["courts", params],
    queryFn: () => fetchCourts(params),
  });
};
