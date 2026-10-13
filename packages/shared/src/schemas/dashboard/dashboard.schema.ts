import { z } from "zod";
import { NonNegativeIntSchema } from "../common";
import { ReservationWithRelationsSchema } from "../reservations";

// =======================================
// Response Data Shape
// =======================================

export const DashboardOverviewSchema = z.object({
  stats: z.object({
    users: NonNegativeIntSchema.default(0),
    customers: NonNegativeIntSchema.default(0),
    reservations: NonNegativeIntSchema.default(0),
    revenue: NonNegativeIntSchema.default(0),
  }),
  reservations_today: z.array(ReservationWithRelationsSchema),
});

// =======================================
// Types
// =======================================

export type DashboardOverview = z.infer<typeof DashboardOverviewSchema>;
