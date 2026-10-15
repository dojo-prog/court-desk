import { api } from "@/lib/axios/client";
import type {
  CreateCustomerBody,
  CustomerQuery,
  UpdateCustomerBody,
} from "@courtdesk/shared";
import type {
  CreateCustomerRes,
  DeleteCustomerRes,
  FetchCustomerRes,
  FetchCustomersRes,
  UpdateCustomerRes,
} from "../types/customer.types";

// =======================================
// Queries
// =======================================

export const fetchCustomers = async (params: CustomerQuery) => {
  const { data } = await api.get<FetchCustomersRes>(`/v1/customers`, {
    params,
  });

  return data.data;
};

export const fetchCustomer = async (customerId: string) => {
  const { data } = await api.get<FetchCustomerRes>(
    `/v1/customers/${customerId}`,
  );

  return data.data;
};

// =======================================
// Mutations
// =======================================

export const createCustomer = async (body: CreateCustomerBody) => {
  const { data } = await api.post<CreateCustomerRes>(`/v1/customers`, body);

  return data.data;
};

export const updateCustomer = async (
  customerId: string,
  body: UpdateCustomerBody,
) => {
  const { data } = await api.patch<UpdateCustomerRes>(
    `/v1/customers/${customerId}`,
    body,
  );

  return data.data;
};

export const deleteCustomer = async (customerId: string) => {
  const { data } = await api.delete<DeleteCustomerRes>(
    `/v1/customers/${customerId}`,
  );

  return data.data;
};
