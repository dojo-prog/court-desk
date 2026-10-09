import { z } from "zod";
import {
  IsoDateTimeSchema,
  ReqEmailSchema,
  ReqFirstNameSchema,
  ReqLastNameSchema,
  UuidSchema,
} from "../common";

// =======================================
// Reusable Fields
// =======================================

export const PasswordHashSchema = z
  .string()
  .min(1, { message: "Hashed password was not provided" });

// =======================================
// Enum
// =======================================

export const UserRoleSchema = z.enum(["staff", "admin"], {
  message: "Invalid user role",
});

// =======================================
// Entity Schema
// =======================================

export const UserPrivateEntitySchema = z.object({
  id: UuidSchema,
  first_name: ReqFirstNameSchema,
  last_name: ReqLastNameSchema,
  email: ReqEmailSchema,
  password_hash: PasswordHashSchema,
  role: UserRoleSchema,
  created_at: IsoDateTimeSchema,
  updated_at: IsoDateTimeSchema,
});

export const UserPublicEntitySchema = UserPrivateEntitySchema.omit({
  password_hash: true,
});

// =======================================
// Types
// =======================================

export type UserRole = z.infer<typeof UserRoleSchema>;

export type UserPrivateEntity = z.infer<typeof UserPrivateEntitySchema>;

export type UserPublicEntity = z.infer<typeof UserPublicEntitySchema>;
