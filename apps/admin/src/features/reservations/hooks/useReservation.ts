import { useQuery } from "@tanstack/react-query";
import { fetchReservation } from "../api/reservation.api";

export const useReservation = (reservationId: string) => {
  return useQuery({
    queryKey: ["reservations", reservationId],
    queryFn: () => fetchReservation(reservationId),
  });
};
