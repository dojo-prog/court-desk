import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../api/user.api";
import { toast } from "sonner";
import { capitalize } from "@/utils/capitalize";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (!data) return;

      const { first_name, last_name, role } = data?.user;

      toast.success(
        `Registered ${capitalize(first_name)} ${capitalize(last_name)} as ${capitalize(role)}`,
      );
    },

    onError: handleApiError,
  });
};
