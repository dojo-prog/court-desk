import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchReservations } from "../api/reservation.api";
import type { ReservationQuery } from "@courtdesk/shared";

export const useReservations = (params: ReservationQuery) => {
  return useQuery({
    queryKey: ["reservations", params],
    queryFn: () => fetchReservations(params),
    placeholderData: keepPreviousData,
  });
};
