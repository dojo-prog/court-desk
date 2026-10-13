import express from "express";
import { authorizeRoles, protectRoute } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validation.middleware";
import { createPaymentLimiter } from "./payment.rate-limit";
import {
  CreatePaymentBodySchema,
  PaymentIdParamsSchema,
  PaymentQuerySchema,
} from "@courtdesk/shared";

import * as paymentController from "./payment.controller";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin", "staff"]));

router
  .route("/")
  .get(validate({ query: PaymentQuerySchema }), paymentController.getPayments)
  .post(
    createPaymentLimiter,
    validate({ body: CreatePaymentBodySchema }),
    paymentController.createPayment,
  );

router.get(
  "/:paymentId",
  validate({ params: PaymentIdParamsSchema }),
  paymentController.getPaymentById,
);

export default router;
