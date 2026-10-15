import type { LoginBody } from "@courtdesk/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginBody) => login(body),

    onSuccess: (data) => {
      queryClient.setQueryData(["current-user"], data?.user);

      toast.success("Login successful");
    },

    onError: handleApiError,
  });
};
