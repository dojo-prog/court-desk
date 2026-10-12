import { GetResult } from "@/types/common.types";
import { CustomerEntity, UpdateCustomerBody } from "@courtdesk/shared";

// =======================================
// Service Params
// =======================================

export type UpdateCustomerParams = {
  customerId: string;
  payload: UpdateCustomerBody;
};

// =======================================
// Results
// =======================================

export type GetCustomersResult = GetResult<"customers", CustomerEntity>;
