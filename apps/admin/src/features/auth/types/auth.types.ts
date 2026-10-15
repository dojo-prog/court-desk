import type { ApiResponse } from "@/types/api.types";
import type { UserPublicEntity } from "@courtdesk/shared";

// =======================================
// Response Shape
// =======================================

export type FetchCurrrentUserResponse = ApiResponse<BaseUserData>;
export type LoginResponse = ApiResponse<BaseUserData>;

// =======================================
// Response Data
// =======================================

export type BaseUserData = { user: UserPublicEntity };
