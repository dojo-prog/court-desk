import { ReservationStatus } from "@courtdesk/shared";

export const reservationStatusTransitions = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["cancelled", "completed"],
  cancelled: [],
  completed: [],
} as const satisfies Record<ReservationStatus, readonly ReservationStatus[]>;
