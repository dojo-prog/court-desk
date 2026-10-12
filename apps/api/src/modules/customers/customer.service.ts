import { GetCustomersResult, UpdateCustomerParams } from "./customer.types";
import {
  CreateCustomerBody,
  CustomerEntity,
  CustomerQuery,
  CustomerWithRelations,
} from "@courtdesk/shared";
import { calculateTotalPages } from "@/utils/calculateTotalPages";
import { AppError } from "@/utils/errors/AppError";

import * as customerRepository from "./customer.repository";

export const getCustomers = async (
  query: CustomerQuery,
): Promise<GetCustomersResult> => {
  const { customers, total } = await customerRepository.find(query);

  const { page, limit } = query;

  return {
    customers,
    pagination: {
      page,
      limit,
      total,
      total_pages: calculateTotalPages(total, limit),
    },
  };
};

export const getCustomerById = async (
  customerId: string,
): Promise<CustomerWithRelations> => {
  const customer = await customerRepository.findWithRelationsById(customerId);

  if (!customer) {
    throw new AppError(404, "Customer not found");
  }

  return customer;
};

export const createCustomer = async (
  payload: CreateCustomerBody,
): Promise<CustomerWithRelations> => {
  return customerRepository.add(payload);
};

export const updateCustomer = async (
  params: UpdateCustomerParams,
): Promise<CustomerWithRelations> => {
  const { customerId, payload } = params;

  const customer = await customerRepository.findById(customerId);

  if (!customer) {
    throw new AppError(404, "Customer not found");
  }

  return customerRepository.update(customer, payload);
};

export const deleteCustomer = async (
  customerId: string,
): Promise<CustomerEntity> => {
  const customer = await customerRepository.remove(customerId);

  if (!customer) {
    throw new AppError(404, "Customer not found");
  }

  return customer;
};
