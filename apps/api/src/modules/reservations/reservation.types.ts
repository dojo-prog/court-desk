import { GetResult } from "@/types/common.types";
import {
  CreateReservationBody,
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
// Repository Final Payload
// =======================================

export type CreateReservationFinalPayload = Omit<
  CreateReservationBody,
  "duration"
> & {
  createdBy: string;
  endTime: string;
};

// =======================================
// Result
// =======================================

export type GetReservationsResult = GetResult<
  "reservations",
  ReservationWithRelations
>;
