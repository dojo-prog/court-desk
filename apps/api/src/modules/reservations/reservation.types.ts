import { GetResult } from "@/types/common.types";
import {
  ReservationWithRelations,
  UpdateReservationStatusBody,
} from "@courtdesk/shared";

// =======================================
// Service Params
// =======================================

export type UpdateReservationStatusParams = {
  reservationId: string;
  payload: UpdateReservationStatusBody;
};

// =======================================
// Result
// =======================================

export type GetReservationsResult = GetResult<
  "reservations",
  ReservationWithRelations
>;
