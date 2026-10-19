import { api } from "@/lib/axios/client";
import type {
  CreateReservationBody,
  ReservationQuery,
  UpdateReservationStatusBody,
} from "@courtdesk/shared";
import type {
  DeleteReservationRes,
  FetchReservationRes,
  FetchReservationsRes,
  UpdateReservationStatusRes,
} from "../types/reservation.types";

// =======================================
// Queries
// =======================================

export const fetchReservations = async (params: ReservationQuery) => {
  const { data } = await api.get<FetchReservationsRes>(`/v1/reservations`, {
    params,
  });

  return data.data;
};

export const fetchReservation = async (reservationId: string) => {
  const { data } = await api.get<FetchReservationRes>(
    `/v1/reservations/${reservationId}`,
  );

  return data.data;
};

// =======================================
// Mutations
// =======================================

export const createReservation = async (body: CreateReservationBody) => {
  const { data } = await api.post<FetchReservationsRes>(
    `/v1/reservations`,
    body,
  );

  return data.data;
};

export const deleteReservation = async (reservationId: string) => {
  const { data } = await api.delete<DeleteReservationRes>(
    `/v1/reservations/${reservationId}`,
  );

  return data.data;
};

export const updateReservationStatus = async (
  reservationId: string,
  body: UpdateReservationStatusBody,
) => {
  const { data } = await api.patch<UpdateReservationStatusRes>(
    `/v1/reservations/${reservationId}/status`,
    body,
  );

  return data.data;
};
