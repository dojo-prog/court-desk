import { UserPublicEntity, UserRole } from "@courtdesk/shared";

export type AccessTokenPayload = {
  id: string;
};

export type RefreshTokenPayload = {
  id: string;
  role: UserRole;
};

// =======================================
// Result
// =======================================

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  userPublic: UserPublicEntity;
}
