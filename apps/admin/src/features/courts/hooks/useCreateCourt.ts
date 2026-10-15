import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourt } from "../api/court.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useCreateCourt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourt,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courts"] });

      toast.success(`Court successfully added to the lineup`);
    },

    onError: handleApiError,
  });
};
