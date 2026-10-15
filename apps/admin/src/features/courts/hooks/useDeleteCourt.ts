import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourt } from "../api/court.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useDeleteCourt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourt,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courts"] });

      toast.success("Court removed successfully");
    },

    onError: handleApiError,
  });
};
