import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { capitalize } from "@/utils/capitalize";
import { formatDate } from "@/utils/dates/formatDate";
import { formatTime } from "@/utils/dates/formatTime";
import { currencyFormatter } from "@/utils/money/currencyFormatter";
import { getStatusVariant } from "@/utils/variants/status/getStatusVariant";
import type { ReservationWithRelations } from "@courtdesk/shared";
import { Clock3, MapPin, UserRound } from "lucide-react";

type ReservationDetailsDialogProps = {
  selectedReservation: ReservationWithRelations | null;
  onOpenChange: (open: boolean) => void;
};

const ReservationDetailsDialog = ({
  selectedReservation,
  onOpenChange,
}: ReservationDetailsDialogProps) => {
  const reservation = selectedReservation;

  const totalPaid =
    reservation?.payments.reduce(
      (total, payment) => total + payment.amount,
      0,
    ) ?? 0;

  return (
    <Dialog open={reservation !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        {reservation && (
          <>
            <DialogHeader>
              <DialogTitle>Reservation Details</DialogTitle>
              <DialogDescription>
                Booking information and payment summary.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant={getStatusVariant(reservation.status)}>
                  {capitalize(reservation.status)}
                </Badge>

                <span className="text-sm text-muted-foreground">
                  {formatDate(reservation.date)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <UserRound className="mt-0.5 size-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>

                    <p className="font-medium">
                      {reservation.customer
                        ? `${reservation.customer.first_name} ${reservation.customer.last_name}`
                        : "Customer unavailable"}
                    </p>

                    {reservation.customer?.email && (
                      <p className="text-sm text-muted-foreground">
                        {reservation.customer.email}
                      </p>
                    )}

                    {reservation.customer?.phone && (
                      <p className="text-sm text-muted-foreground">
                        {reservation.customer.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">Court</p>
                    <p className="font-medium">
                      {reservation.court?.name ?? "Court unavailable"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 size-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Reservation time
                    </p>
                    <p className="font-medium">
                      {formatTime(reservation.start_time)} –{" "}
                      {formatTime(reservation.end_time)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Total amount</span>
                  <span className="font-medium">
                    {currencyFormatter.format(reservation.total_amount)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Minimum payment</span>
                  <span>
                    {currencyFormatter.format(reservation.minimum_payment)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">Total paid</span>
                  <span className="font-medium">
                    {currencyFormatter.format(totalPaid)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-t pt-3">
                  <span className="text-sm text-muted-foreground">
                    Remaining balance
                  </span>
                  <span className="font-semibold">
                    {currencyFormatter.format(
                      reservation.total_amount - totalPaid,
                    )}
                  </span>
                </div>
              </div>

              {reservation.notes && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Notes</p>
                  <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                    {reservation.notes}
                  </p>
                </div>
              )}

              <Button
                className="w-full"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetailsDialog;
