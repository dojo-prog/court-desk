import { useQuery } from "@tanstack/react-query";
import { fetchPayment } from "../api/payment.api";

export const usePayment = (paymentId: string) => {
  return useQuery({
    queryKey: ["payments", paymentId],
    queryFn: () => fetchPayment(paymentId),
  });
};
