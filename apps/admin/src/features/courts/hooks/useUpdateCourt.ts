import type { UpdateCourtBody } from "@courtdesk/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourt } from "../api/court.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

type Variables = {
  courtId: string;
  body: UpdateCourtBody;
};

export const useUpdateCourt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courtId, body }: Variables) => updateCourt(courtId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courts"] });

      toast.success("Court information updated");
    },

    onError: handleApiError,
  });
};
