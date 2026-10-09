import { z } from "zod";
import {
  MoneySchema,
  PaginationQuerySchema,
  SearchQuerySchema,
  UuidSchema,
} from "../common";
import { PaymentMethodSchema } from "./payment.schema";

// =======================================
// Params
// =======================================

export const PaymentIdParamsSchema = z.object({
  paymentId: UuidSchema,
});

// =======================================
// Query
// =======================================

export const PaymentQuerySchema = z.object({
  ...PaginationQuerySchema.shape,

  search: SearchQuerySchema,
});

// =======================================
// Body
// =======================================

export const CreatePaymentBodySchema = z.object({
  reservation_id: UuidSchema,

  amount: MoneySchema,
  method: PaymentMethodSchema,
});

// =======================================
// Types
// =======================================

export type PaymentQuery = z.infer<typeof PaymentQuerySchema>;

export type CreatePaymentBody = z.infer<typeof CreatePaymentBodySchema>;
