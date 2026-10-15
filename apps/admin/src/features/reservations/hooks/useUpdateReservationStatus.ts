import type { UpdateReservationStatusBody } from "@courtdesk/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReservationStatus } from "../api/reservation.api";
import { toast } from "sonner";
import { capitalize } from "@/utils/capitalize";

type Variables = {
  reservationId: string;
  body: UpdateReservationStatusBody;
};

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, body }: Variables) =>
      updateReservationStatus(reservationId, body),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });

      if (!data) {
        toast.success("Reservation status has been updated successfully");
        return;
      }

      const { status } = data.reservation;

      toast.success(`Reservation status set to ${capitalize(status)}`);
    },
  });
};
