import { z } from "zod";
import {
  IsoDateTimeSchema,
  MoneySchema,
  ReqFirstNameSchema,
  ReqLastNameSchema,
  UuidSchema,
} from "../common";
import { CourtNameSchema } from "../courts";

// =======================================
// Enum
// =======================================

export const PaymentMethodSchema = z.enum(
  ["cash", "gcash", "bank_transfer", "card"],
  { message: "Unregistered payment method" },
);

// =======================================
// Entity
// =======================================

export const PaymentEntitySchema = z.object({
  id: UuidSchema,

  reservation_id: UuidSchema,
  recorded_by: UuidSchema,

  amount: MoneySchema,
  method: PaymentMethodSchema,

  paid_at: IsoDateTimeSchema,
  created_at: IsoDateTimeSchema,
});

export const PaymentWithRelationsSchema = PaymentEntitySchema.omit({
  reservation_id: true,
  recorded_by: true,
}).extend({
  reservation: z.object({
    id: UuidSchema,
    court: z
      .object({
        id: UuidSchema,
        name: CourtNameSchema,
      })
      .nullable(),
    customer: z
      .object({
        id: UuidSchema,
        first_name: ReqFirstNameSchema,
        last_name: ReqLastNameSchema,
      })
      .nullable(),
  }),

  recorded_by: z.object({
    id: UuidSchema,
    first_name: ReqFirstNameSchema,
    last_name: ReqLastNameSchema,
  }),
});

// =======================================
// Types
// =======================================

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

export type PaymentEntity = z.infer<typeof PaymentEntitySchema>;
