import type { ApiResponse } from "@/types/api.types";
import type { UserPublicEntity } from "@courtdesk/shared";

// =======================================
// Response Shape
// =======================================

export type FetchUsersRes = ApiResponse<FetchUsersData>;
export type FetchUserRes = ApiResponse<UserData>;
export type RegisterUsersRes = ApiResponse<UserData>;
export type UpdateUserRes = ApiResponse<UserData>;
export type DeleteUsersRes = ApiResponse<UserData>;

// =======================================
// Response Data
// =======================================

export type FetchUsersData = { users: UserPublicEntity[] };

export type UserData = { user: UserPublicEntity };
