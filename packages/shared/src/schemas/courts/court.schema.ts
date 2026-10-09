import { z } from "zod";
import { IsoDateTimeSchema, UuidSchema } from "../common";

// =======================================
// Reusable Fields
// =======================================

export const CourtNameSchema = z
  .string()
  .trim()
  .min(1, { message: "Court name is required" })
  .max(100, { message: "Court name cannot exceed 100 characters" });

// =======================================
// Enum
// =======================================

export const CourtStatusSchema = z.enum(["active", "maintenance", "inactive"], {
  message: "Invalid court status",
});

// =======================================
// Entity
// =======================================

export const CourtEntitySchema = z.object({
  id: UuidSchema,
  name: CourtNameSchema,
  status: CourtStatusSchema,
  created_at: IsoDateTimeSchema,
  updated_at: IsoDateTimeSchema.nullable(),
});

// =======================================
// Types
// =======================================

export type CourtStatus = z.infer<typeof CourtStatusSchema>;

export type CourtEntity = z.infer<typeof CourtEntitySchema>;
