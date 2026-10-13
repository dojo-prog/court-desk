import { GetResult } from "@/types/common.types";
import { PaymentWithRelations } from "@courtdesk/shared";

// =======================================
// Result
// =======================================

export type GetPaymentsResult = GetResult<"payments", PaymentWithRelations>;
