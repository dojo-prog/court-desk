import type { ApiResponse, PaginatedData } from "@/types/api.types";
import type { CustomerEntity, CustomerWithRelations } from "@courtdesk/shared";

// =======================================
// Response Shape
// =======================================

export type FetchCustomersRes = ApiResponse<FetchCustomersData>;

export type FetchCustomerRes = ApiResponse<CustomerWithRelationsData>;

export type CreateCustomerRes = ApiResponse<CustomerWithRelationsData>;

export type UpdateCustomerRes = ApiResponse<CustomerWithRelationsData>;

export type DeleteCustomerRes = ApiResponse<CustomerData>;

// =======================================
// Response Data
// =======================================

export type FetchCustomersData = PaginatedData<
  "customers",
  CustomerWithRelations
>;

export type CustomerData = { customer: CustomerEntity };

export type CustomerWithRelationsData = { customer: CustomerWithRelations };
