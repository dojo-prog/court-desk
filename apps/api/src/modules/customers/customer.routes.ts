import express from "express";
import { authorizeRoles, protectRoute } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validation.middleware";
import {
  CreateCustomerBodySchema,
  CustomerIdParamsSchema,
  CustomerQuerySchema,
  UpdateCustomerBodySchema,
} from "@courtdesk/shared";
import {
  createCustomerLimiter,
  deleteCustomerLimiter,
  updateCustomerLimiter,
} from "./customer.rate-limit";

import * as customerController from "./customer.controller";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin", "staff"]));

(router
  .route("/")
  .get(
    validate({ query: CustomerQuerySchema }),
    customerController.getCustomers,
  )
  .post(createCustomerLimiter, validate({ body: CreateCustomerBodySchema })),
  customerController.createCustomer);

router
  .route("/:customerId")
  .get(
    validate({ params: CustomerIdParamsSchema }),
    customerController.getCustomerById,
  )
  .patch(
    updateCustomerLimiter,
    validate({
      params: CustomerIdParamsSchema,
      body: UpdateCustomerBodySchema,
    }),
    customerController.updateCustomer,
  )
  .get(
    deleteCustomerLimiter,
    validate({ params: CustomerIdParamsSchema }),
    customerController.deleteCustomer,
  );

export default router;
