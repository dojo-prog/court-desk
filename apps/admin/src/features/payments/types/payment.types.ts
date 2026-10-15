import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type { PaymentEntity, PaymentWithRelations } from "@courtdesk/shared";

// =======================================
// Response Shape
// =======================================

export type FetchPaymentsRes = ApiResponse<FetchPaymentsData>;

export type FetchPaymentRes = ApiResponse<PaymentWithRelationsData>;

export type CreatePaymentRes = ApiResponse<PaymentWithRelationsData>;

// =======================================
// Response Data
// =======================================

export type FetchPaymentsData = PaginatedData<"payments", PaymentWithRelations>;

export type PaymentData = { payment: PaymentEntity };

export type PaymentWithRelationsData = { payment: PaymentWithRelations };
