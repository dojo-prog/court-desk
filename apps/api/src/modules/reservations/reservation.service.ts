import { calculateTotalPages } from "@/utils/calculateTotalPages";
import { AppError } from "@/utils/errors/AppError";
import { calculateEndTime } from "@/utils/calculateEndTime";
import { isValidStatusTransition } from "@/utils/isValidStatusTransition";
import {
  CreateReservationBody,
  ReservationEntity,
  ReservationQuery,
  ReservationWithRelations,
} from "@courtdesk/shared";
import {
  CreateReservationFinalPayload,
  GetReservationsResult,
  UpdateReservationStatusParams,
} from "./reservation.types";

import * as reservationRepository from "./reservation.repository";

export const getReservations = async (
  query: ReservationQuery,
): Promise<GetReservationsResult> => {
  const { reservations, total } = await reservationRepository.find(query);

  const { page, limit } = query;

  return {
    reservations,
    pagination: {
      page,
      limit,
      total,
      total_pages: calculateTotalPages(total, limit),
    },
  };
};

export const getReservationById = async (
  reservationId: string,
): Promise<ReservationWithRelations> => {
  const reservation =
    await reservationRepository.findWithRelationsById(reservationId);

  if (!reservation) {
    throw new AppError(404, "Reservation not found");
  }

  return reservation;
};

export const createReservation = async (
  payload: CreateReservationBody & { createdBy: string },
): Promise<ReservationWithRelations> => {
  const finalPayload: CreateReservationFinalPayload = {
    ...payload,
    endTime: calculateEndTime(payload.startTime, payload.duration),
  };

  return reservationRepository.add(finalPayload);
};

export const deleteReservation = async (
  reservationId: string,
): Promise<ReservationEntity> => {
  const reservation = await reservationRepository.remove(reservationId);

  if (!reservation) {
    throw new AppError(404, "Reservation not found");
  }

  return reservation;
};

export const updateReservationStatus = async (
  params: UpdateReservationStatusParams,
): Promise<ReservationWithRelations> => {
  const { reservationId, payload } = params;

  const reservation = await reservationRepository.findById(reservationId);

  if (!reservation) {
    throw new AppError(404, "Reservation not found");
  }

  const nextStatus = payload.status;
  const currentStatus = reservation.status;

  if (!isValidStatusTransition(currentStatus, nextStatus)) {
    throw new AppError(
      400,
      `${currentStatus} reservations cannot transition to ${nextStatus}`,
    );
  }

  return reservationRepository.update(reservation, payload);
};
