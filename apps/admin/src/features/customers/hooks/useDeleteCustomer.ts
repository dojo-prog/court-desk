import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer } from "../api/customer.api";
import { toast } from "sonner";
import { capitalize } from "@/utils/capitalize";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerId: string) => deleteCustomer(customerId),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });

      if (!data) {
        toast.success("Customer has been removed from the records");
        return;
      }

      const { first_name, last_name } = data.customer;

      toast.success(
        `Customer ${capitalize(first_name)} ${capitalize(last_name)} has been remoeved from the records`,
      );
    },

    onError: handleApiError,
  });
};
