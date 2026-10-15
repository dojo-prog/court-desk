import { useQuery } from "@tanstack/react-query";
import { fetchCourt } from "../api/court.api";

export const useCourt = (courtId: string) => {
  return useQuery({
    queryKey: ["courts", courtId],
    queryFn: () => fetchCourt(courtId),
  });
};
