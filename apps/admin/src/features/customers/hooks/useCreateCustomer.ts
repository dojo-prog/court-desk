import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "../api/customer.api";
import { toast } from "sonner";
import { capitalize } from "@/utils/capitalize";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });

      if (!data) {
        toast.success("Customer has been added to the records");
        return;
      }

      const { first_name, last_name } = data.customer;

      toast.success(
        `Customer ${capitalize(first_name)} ${capitalize(last_name)} has been added to the records`,
      );
    },

    onError: handleApiError,
  });
};
