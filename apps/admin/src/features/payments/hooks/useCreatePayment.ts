import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "../api/payment.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPayment,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["reservations"] });

      toast.success("Payment recorded successfully");
    },

    onError: handleApiError,
  });
};
