import type { ApiResponse } from "@/types/api.types";
import type { CourtEntity } from "@courtdesk/shared";

// =======================================
// Response Shape
// =======================================

export type FetchCourtsRes = ApiResponse<CourtsData>;

export type FetchCourtRes = ApiResponse<CourtData>;

export type CreateCourtRes = ApiResponse<CourtData>;

export type UpdateCourtRes = ApiResponse<CourtData>;

export type DeleteCourtRes = ApiResponse<CourtData>;

// =======================================
// Response Data
// =======================================

export type CourtsData = { courts: CourtEntity[] };

export type CourtData = { court: CourtEntity };
