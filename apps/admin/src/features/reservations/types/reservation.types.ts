import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type {
  ReservationEntity,
  ReservationWithRelations,
} from "@courtdesk/shared";

// =======================================
// Response Shape
// =======================================

export type FetchReservationsRes = ApiResponse<FetchReservationsData>;

export type FetchReservationRes = ApiResponse<ReservationWithRelationsData>;

export type CreateReservationRes = ApiResponse<ReservationWithRelationsData>;

export type DeleteReservationRes = ApiResponse<ReservationData>;

export type UpdateReservationStatusRes =
  ApiResponse<ReservationWithRelationsData>;

// =======================================
// Response Data
// =======================================

export type FetchReservationsData = PaginatedData<
  "reservations",
  ReservationWithRelations
>;

export type ReservationData = { reservation: ReservationEntity };

export type ReservationWithRelationsData = {
  reservation: ReservationWithRelations;
};
