import { UserRole } from "@courtdesk/shared";

export type AccessTokenPayload = {
  id: string;
};

export type RefreshTokenPayload = {
  id: string;
  role: UserRole;
};
