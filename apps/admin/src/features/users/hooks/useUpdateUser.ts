import type { UpdateUserBody } from "@courtdesk/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/user.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

type Variables = {
  userId: string;
  body: UpdateUserBody;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, body }: Variables) => updateUser(userId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("User info updated");
    },

    onError: handleApiError,
  });
};
