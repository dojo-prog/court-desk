import express from "express";
import { authorizeRoles, protectRoute } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validation.middleware";
import {
  CreateReservationBodySchema,
  ReservationIdParamsSchema,
  ReservationQuerySchema,
  UpdateReservationStatusBodySchema,
} from "@courtdesk/shared";
import {
  createReservationLimiter,
  updateReservationLimiter,
} from "./reservation.rate-limit";

import * as reservationController from "./reservation.controller";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin", "staff"]));

router
  .route("/")
  .get(
    validate({ query: ReservationQuerySchema }),
    reservationController.getReservations,
  )
  .post(
    createReservationLimiter,
    validate({ body: CreateReservationBodySchema }),
    reservationController.createReservation,
  );

router
  .route("/:reservationId")
  .get(
    validate({ params: ReservationIdParamsSchema }),
    reservationController.getReservationById,
  )
  .delete(
    validate({ params: ReservationIdParamsSchema }),
    reservationController.deleteReservation,
  );

router.patch(
  "/:reservationId/status",
  updateReservationLimiter,
  validate({
    params: ReservationIdParamsSchema,
    body: UpdateReservationStatusBodySchema,
  }),
  reservationController.updateReservationStatus,
);

export default router;
