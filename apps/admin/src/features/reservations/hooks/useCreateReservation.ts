import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReservation } from "../api/reservation.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/errors/handleApiError";

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReservation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });

      toast.success("Reservation created successfully");
    },

    onError: handleApiError,
  });
};
