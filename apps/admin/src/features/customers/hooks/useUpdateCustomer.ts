import type { UpdateCustomerBody } from "@courtdesk/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomer } from "../api/customer.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

type Variables = {
  customerId: string;
  body: UpdateCustomerBody;
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ customerId, body }: Variables) =>
      updateCustomer(customerId, body),

    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["customers"] }),
        toast.success("Customer info updated"));
    },

    onError: handleApiError,
  });
};
