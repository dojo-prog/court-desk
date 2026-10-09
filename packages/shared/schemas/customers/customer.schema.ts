import { z } from "zod";
import {
  IsoDateTimeSchema,
  OptionalEmailSchema,
  OptionalPhPhoneSchema,
  ReqFirstNameSchema,
  ReqLastNameSchema,
  UuidSchema,
} from "../common";

// =======================================
// Entity
// =======================================

export const CustomerEntitySchema = z.object({
  id: UuidSchema,
  first_name: ReqFirstNameSchema,
  last_name: ReqLastNameSchema,
  email: OptionalEmailSchema,
  phone: OptionalPhPhoneSchema,
  created_at: IsoDateTimeSchema,
  updated_at: IsoDateTimeSchema.nullable(),
});

export const CustomerWithRelationsSchema = CustomerEntitySchema.extend({
  reservations_count: z.number().int().default(0),
});

// =======================================
// Types
// =======================================

export type CustomerEntity = z.infer<typeof CustomerEntitySchema>;
