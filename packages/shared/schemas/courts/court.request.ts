import { z } from "zod";
import { SearchQuerySchema, UuidSchema } from "../common";
import { CourtNameSchema, CourtStatusSchema } from "./court.schema";

// =======================================
// Params
// =======================================

export const CourtIdParamsSchema = z.object({
  courtId: UuidSchema,
});

// =======================================
// Query
// =======================================

export const CourtQuerySchema = z.object({
  search: SearchQuerySchema,
});

// =======================================
// Body
// =======================================

export const CreateCourtBodySchema = z.object({
  name: CourtNameSchema,
  status: CourtStatusSchema.default("active"),
});

export const UpdateCourtBodySchema = CreateCourtBodySchema.extend({});

// =======================================
// Types
// =======================================

export type CourtQuery = z.infer<typeof CourtQuerySchema>;

export type CreateCourtBody = z.infer<typeof CreateCourtBodySchema>;

export type UpdateCourtBody = z.infer<typeof UpdateCourtBodySchema>;
