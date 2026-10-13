import { Controller } from "@/types/handlers";
import {
  ReservationAvailabilityQuerySchema,
  ReservationQuerySchema,
} from "@courtdesk/shared";

import * as reservationService from "./reservation.service";

export const getReservations: Controller = async (req, res, next) => {
  try {
    const data = await reservationService.getReservations(
      ReservationQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getReservationById: Controller = async (req, res, next) => {
  try {
    const reservation = await reservationService.getReservationById(
      req.params.reservationId as string,
    );

    res.status(200).json({ success: true, data: { reservation } });
  } catch (error) {
    next(error);
  }
};

export const checkAvailability: Controller = async (req, res, next) => {
  try {
    const reservation = await reservationService.checkAvailability(
      ReservationAvailabilityQuerySchema.parse(req.query),
    );

    const data = reservation
      ? { available: false, reservation }
      : { available: true };

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createReservation: Controller = async (req, res, next) => {
  try {
    const reservation = await reservationService.createReservation({
      ...req.body,
      createdBy: req.user!.id,
    });

    res.status(201).json({ success: true, data: { reservation } });
  } catch (error) {
    next(error);
  }
};

export const deleteReservation: Controller = async (req, res, next) => {
  try {
    const reservation = await reservationService.deleteReservation(
      req.params.reservationId as string,
    );

    res.status(200).json({ success: true, data: { reservation } });
  } catch (error) {
    next(error);
  }
};

export const updateReservationStatus: Controller = async (req, res, next) => {
  try {
    const reservation = await reservationService.updateReservationStatus({
      reservationId: req.params.reservationId as string,
      payload: req.body,
    });

    res.status(200).json({ success: true, data: { reservation } });
  } catch (error) {
    next(error);
  }
};
