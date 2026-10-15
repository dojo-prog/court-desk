import { useQuery } from "@tanstack/react-query";
import { fetchCustomer } from "../api/customer.api";

export const useCustomer = (customerId: string) => {
  return useQuery({
    queryKey: ["customers", customerId],
    queryFn: () => fetchCustomer(customerId),
  });
};
