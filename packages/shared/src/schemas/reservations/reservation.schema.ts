import { z } from "zod";
import {
  IsoDateSchema,
  IsoDateTimeSchema,
  IsoTimeSchema,
  MoneySchema,
  NotesSchema,
  OptionalEmailSchema,
  OptionalPhPhoneSchema,
  ReqEmailSchema,
  ReqFirstNameSchema,
  ReqLastNameSchema,
  UuidSchema,
} from "../common";
import { CourtNameSchema } from "../courts";

// =======================================
// Enum
// =======================================

export const ReservationStatusSchema = z.enum(
  ["pending", "confirmed", "completed", "cancelled"],
  { message: "Invalid reservation status" },
);

export const PaymentStatusSchema = z.enum(
  ["pending", "partial", "fully_paid"],
  { message: "Invalid reservation status" },
);

// =======================================
// Entity
// =======================================

export const ReservationEntitySchema = z.object({
  id: UuidSchema,

  customer_id: UuidSchema.nullable(),
  court_id: UuidSchema.nullable(),
  created_by: UuidSchema.nullable(),

  date: IsoDateSchema,

  start_time: IsoTimeSchema,
  end_time: IsoTimeSchema,

  total_amount: MoneySchema,
  minimum_payment: MoneySchema,

  status: ReservationStatusSchema,
  payment_status: PaymentStatusSchema,

  notes: NotesSchema.nullable(),

  created_at: IsoDateTimeSchema,
  updated_at: IsoDateTimeSchema.nullable(),
});

export const ReservationWithRelationsSchema = ReservationEntitySchema.omit({
  customer_id: true,
  court_id: true,
  created_by: true,
}).extend({
  customer: z
    .object({
      id: UuidSchema,
      first_name: ReqFirstNameSchema,
      last_name: ReqLastNameSchema,
      email: OptionalEmailSchema,
      phone: OptionalPhPhoneSchema,
    })
    .nullable(),

  court: z
    .object({
      id: UuidSchema,
      name: CourtNameSchema,
    })
    .nullable(),

  created_by: z
    .object({
      id: UuidSchema,
      first_name: ReqFirstNameSchema,
      last_name: ReqLastNameSchema,
      email: ReqEmailSchema,
    })
    .nullable(),
});

// =======================================
// Types
// =======================================

export type ReservationStatus = z.infer<typeof ReservationStatusSchema>;

export type ReservationEntity = z.infer<typeof ReservationEntitySchema>;

export type ReservationWithRelations = z.infer<
  typeof ReservationWithRelationsSchema
>;
