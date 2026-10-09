import { z } from "zod";
import { ReqEmailSchema } from "../common";

export const LoginPasswordSchema = z
  .string()
  .min(1, { message: "Password is required" });

// =======================================
// Body
// =======================================

export const LoginBodySchema = z.object({
  email: ReqEmailSchema,
  password: LoginPasswordSchema,
});

// =======================================
// Types
// =======================================

export type LoginBody = z.infer<typeof LoginBodySchema>;
