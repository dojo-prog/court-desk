import { z } from "zod";
import {
  IsoDateSchema,
  IsoDateTimeSchema,
  MoneySchema,
  NotesSchema,
  PaginationQuerySchema,
  ReqIsoDateSchema,
  ReqIsoTimeSchema,
  SearchQuerySchema,
  UuidSchema,
} from "../common";
import { ReservationStatusSchema } from "./reservation.schema";

export const ReservationDurationSchema = z
  .number()
  .finite("Duration must be a finite number")
  .int("Duration must be a whole number")
  .min(1, "Duration must be at least 1 hour")
  .max(24, "Duration cannot exceed 24 hours");

export const ReservationAllowableSortSchema = z.enum([
  "newest",
  "oldest",
  "startTimeAsc",
  "startTimeDesc",
]);

// =======================================
// Params
// =======================================

export const ReservationIdParamsSchema = z.object({
  reservationId: UuidSchema,
});

// =======================================
// Query
// =======================================

export const ReservationQuerySchema = z.object({
  ...PaginationQuerySchema.shape,
  status: ReservationStatusSchema.optional(),
  search: SearchQuerySchema,
  date: IsoDateSchema.optional(),
  sortBy: ReservationAllowableSortSchema.optional(),
});

// =======================================
// Body
// =======================================

export const CreateReservationBodySchema = z
  .object({
    customer_id: UuidSchema.nullable(),
    court_id: UuidSchema.nullable(),

    date: ReqIsoDateSchema,

    start_time: ReqIsoTimeSchema,
    duration: ReservationDurationSchema,

    total_amount: MoneySchema,
    minimum_payment: MoneySchema,

    status: ReservationStatusSchema.default("pending"),

    notes: NotesSchema.optional(),
  })
  .refine(
    ({ start_time, duration }) => {
      const [hours, minutes] = start_time.split(":").map(Number);
      const startMinutes = hours * 60 + minutes;
      const endMinutes = startMinutes + duration * 60;

      return endMinutes <= 24 * 60;
    },
    {
      message: "Reservation must end before midnight",
      path: ["duration"],
    },
  );

export const UpdateReservationStatusBodySchema = z.object({
  status: ReservationStatusSchema,
});

// =======================================
// Types
// =======================================

export type ReservationSorts = z.infer<typeof ReservationAllowableSortSchema>;

export type ReservationQuery = z.infer<typeof ReservationQuerySchema>;

export type CreateReservationBody = z.infer<typeof CreateReservationBodySchema>;

export type UpdateReservationStatusBody = z.infer<
  typeof UpdateReservationStatusBodySchema
>;
