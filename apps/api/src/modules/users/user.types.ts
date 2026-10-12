import { RegisterUserBody, UpdateUserBody } from "@courtdesk/shared";

// =======================================
// Service Params
// =======================================

export interface UpdateUserParams {
  userId: string;
  payload: UpdateUserBody;
}

// =======================================
// Repository Payload
// =======================================

export type RegisterUserFinalPayload = Omit<
  RegisterUserBody,
  "password" | "confirmPassword"
> & {
  passwordHash: string;
};
