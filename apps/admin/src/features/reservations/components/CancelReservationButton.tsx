import { useState } from "react";
import type { ReservationWithRelations } from "@courtdesk/shared";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/common/ButtonLoader";
import { formatDate } from "@/utils/dates/formatDate";
import { formatTime } from "@/utils/dates/formatTime";
import { useUpdateReservationStatus } from "../hooks/useUpdateReservationStatus";

type Props = {
  reservation: ReservationWithRelations;
  onSuccess?: () => void;
};

const CancelReservationButton = ({ reservation, onSuccess }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { mutateAsync: updateReservation, isPending } =
    useUpdateReservationStatus();

  if (!reservation) return null;

  const { date, start_time, end_time, customer, court } = reservation;

  const customerName =
    customer?.first_name && customer?.last_name
      ? `${customer.first_name} ${customer.last_name}`
      : "Guest";

  const courtName = court?.name ? ` for ${court.name}` : "";

  const handleCancelReservation = async () => {
    await updateReservation({
      reservationId: reservation.id,
      body: { status: "cancelled" },
    });

    setOpen(false);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={"w-full"}>
        <Button
          variant={"destructive"}
          className={"flex-1 text-foreground w-full"}
        >
          Cancel Reservation
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Cancel reservation for {customerName}?
          </AlertDialogTitle>

          <AlertDialogDescription className="space-y-2">
            <span>
              Are you sure you want to cancel the reservation{courtName} on{" "}
              <strong>{formatDate(date)}</strong> from{" "}
              <strong>{formatTime(start_time)}</strong> to{" "}
              <strong>{formatTime(end_time)}</strong>?
            </span>
            <span className="block text-muted-foreground text-xs">
              This action will mark the reservation status as cancelled.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Keep Reservation
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={handleCancelReservation}
            disabled={isPending}
            className={"text-foreground"}
          >
            <ButtonLoader isLoading={isPending}>
              Cancel Reservation
            </ButtonLoader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelReservationButton;
