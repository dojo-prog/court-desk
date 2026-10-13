import { reservationStatusTransitions } from "@/constants/reservation.constant";
import { ReservationStatus } from "@courtdesk/shared";

export const isValidStatusTransition = <S extends ReservationStatus>(
  current: S,
  next: ReservationStatus,
): boolean => {
  return (
    reservationStatusTransitions[current] as readonly ReservationStatus[]
  ).includes(next);
};
