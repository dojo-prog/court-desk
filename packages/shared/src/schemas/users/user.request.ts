import { z } from "zod";
import {
  ReqEmailSchema,
  ReqFirstNameSchema,
  ReqLastNameSchema,
  SearchQuerySchema,
  UuidSchema,
} from "../common";

export const RegisterUserPasswordSchema = z
  .string()
  .min(6, "Password must at least be 6 characters long")
  .max(100, "Password cannot exceed 100 characters");

// =======================================
// Params
// =======================================

export const UserIdParamsSchema = z.object({
  userId: UuidSchema,
});

// =======================================
// Query
// =======================================

export const UserQuerySchema = z.object({
  search: SearchQuerySchema,
});

// =======================================
// Body
// =======================================

export const RegisterUserBodySchema = z
  .object({
    firstName: ReqFirstNameSchema,
    lastName: ReqLastNameSchema,
    email: ReqEmailSchema,
    password: RegisterUserPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["password", "confirmPassword"],
  });

export const UpdateUserBodySchema = z.object({
  firstName: ReqFirstNameSchema,
  lastName: ReqLastNameSchema,
});

// =======================================
// Types
// =======================================

export type UserQuery = z.infer<typeof UserQuerySchema>;

export type RegisterUserBody = z.infer<typeof RegisterUserBodySchema>;

export type UpdateUserBody = z.infer<typeof UpdateUserBodySchema>;
