import express from "express";
import { authorizeRoles, protectRoute } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validation.middleware";
import {
  CourtIdParamsSchema,
  CourtQuerySchema,
  CreateCourtBodySchema,
} from "@courtdesk/shared";
import {
  createCourtLimiter,
  deleteCourtLimiter,
  updateCourtLimiter,
} from "./court.rate-limit";

import * as courtController from "./court.controller";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router
  .route("/")
  .get(validate({ query: CourtQuerySchema }), courtController.getCourts)
  .post(
    createCourtLimiter,
    validate({ body: CreateCourtBodySchema }),
    courtController.createCourt,
  );

router
  .route("/:courtId")
  .get(validate({ params: CourtIdParamsSchema }), courtController.getCourtById)
  .patch(
    updateCourtLimiter,
    validate({ params: CourtIdParamsSchema }),
    courtController.updateCourt,
  )
  .delete(
    deleteCourtLimiter,
    validate({ params: CourtIdParamsSchema }),
    courtController.deleteCourt,
  );

export default router;
