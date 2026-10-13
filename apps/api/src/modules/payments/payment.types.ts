import { GetResult } from "@/types/common.types";
import { CreatePaymentBody, PaymentWithRelations } from "@courtdesk/shared";

// =======================================
// Repository Final Payload
// =======================================

export type CreatePaymentFinalPayload = CreatePaymentBody & {
  recordedBy: string;
};

// =======================================
// Result
// =======================================

export type GetPaymentsResult = GetResult<"payments", PaymentWithRelations>;
