import type { PaymentQuery } from "@courtdesk/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPayments } from "../api/payment.api";

export const usePayments = (params: PaymentQuery) => {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => fetchPayments(params),
    placeholderData: keepPreviousData,
  });
};
