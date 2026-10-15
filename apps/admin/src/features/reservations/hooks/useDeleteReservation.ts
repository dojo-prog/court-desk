import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReservation } from "../api/reservation.api";
import { toast } from "sonner";

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReservation,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });

      toast.success("Reservation removed successfully");
    },
  });
};
