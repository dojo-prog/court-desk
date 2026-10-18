import type { CustomerQuery } from "@courtdesk/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../api/customer.api";

export const useCustomers = (params: CustomerQuery) => {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => fetchCustomers(params),
    placeholderData: keepPreviousData,
  });
};
