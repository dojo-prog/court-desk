import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/user.api";
import { toast } from "sonner";
import { capitalize } from "@/utils/capitalize";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (!data) return;

      const { role, first_name, last_name } = data.user;

      toast.success(
        `${capitalize(role)} ${capitalize(first_name)} ${capitalize(last_name)} has been removed successfully`,
      );
    },

    onError: handleApiError,
  });
};
