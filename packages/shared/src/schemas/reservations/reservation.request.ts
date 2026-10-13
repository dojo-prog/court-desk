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
    customerId: UuidSchema.nullable(),
    courtId: UuidSchema.nullable(),

    date: ReqIsoDateSchema,

    startTime: ReqIsoTimeSchema,
    duration: ReservationDurationSchema,

    totalAmount: MoneySchema,
    minimumPayment: MoneySchema,

    status: ReservationStatusSchema.default("pending"),

    notes: NotesSchema.optional(),
  })
  .refine(
    ({ startTime, duration }) => {
      const [hours, minutes] = startTime.split(":").map(Number);
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
