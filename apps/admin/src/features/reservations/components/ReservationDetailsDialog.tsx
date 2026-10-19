import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddPaymentForm from "@/features/payments/components/AddPaymentForm";
import { capitalize } from "@/utils/capitalize";
import { formatDate } from "@/utils/dates/formatDate";
import { formatTime } from "@/utils/dates/formatTime";
import { getPaymentStatus } from "@/utils/getPaymentStatus";
import { getTotalPaid } from "@/utils/getTotalPaid";
import { currencyFormatter } from "@/utils/money/currencyFormatter";
import { getPaymentStatusClassName } from "@/utils/variants/status/getPaymentStatusClassName";
import { getStatusVariant } from "@/utils/variants/status/getStatusVariant";
import type { ReservationWithRelations } from "@courtdesk/shared";
import { Clock3, MapPin, UserRound } from "lucide-react";
import { useState } from "react";

type ReservationDetailsDialogProps = {
  selectedReservation: ReservationWithRelations | null;
  onOpenChange: (open: boolean) => void;
};

const ReservationDetailsDialog = ({
  selectedReservation,
  onOpenChange,
}: ReservationDetailsDialogProps) => {
  const [addingPayment, setAddingPayment] = useState<boolean>(false);

  const reservation = selectedReservation;

  if (!reservation) return null;

  const totalPaid = getTotalPaid(reservation);

  const paymentStatus = getPaymentStatus(reservation.total_amount, totalPaid);

  const remainingBalance = reservation
    ? reservation?.total_amount - totalPaid
    : 0;

  return (
    <Dialog open={reservation !== null} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col max-h-[85vh] overflow-hidden sm:max-w-lg">
        {reservation && (
          <>
            <DialogHeader>
              <DialogTitle>Reservation Details</DialogTitle>
              <DialogDescription>
                Booking information and payment summary.
              </DialogDescription>
            </DialogHeader>

            <div
              className="space-y-5 overflow-y-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={getStatusVariant(reservation.status)}
                    className="text-foreground"
                  >
                    {capitalize(reservation.status)}
                  </Badge>

                  {/* Payment Status */}
                  <Badge
                    className={`${getPaymentStatusClassName(paymentStatus)}`}
                  >
                    {capitalize(paymentStatus)}
                  </Badge>
                </div>

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
                    {currencyFormatter.format(remainingBalance)}
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

              {addingPayment && (
                <AddPaymentForm
                  reservation={reservation}
                  setOpen={setAddingPayment}
                />
              )}

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className={"flex-1"}
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>

                {remainingBalance > 0 && !addingPayment && (
                  <Button
                    className={"flex-1 text-foreground"}
                    onClick={() => setAddingPayment(true)}
                  >
                    Add Payment
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetailsDialog;
