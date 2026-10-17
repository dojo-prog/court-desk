import { Badge } from "@/components/ui/badge";
import { capitalize } from "@/utils/capitalize";
import { formatTime } from "@/utils/dates/formatTime";
import { currencyFormatter } from "@/utils/money/currencyFormatter";
import { getStatusVariant } from "@/utils/variants/status/getStatusVariant";
import type { ReservationWithRelations } from "@courtdesk/shared";
import { ChevronRight, Clock3, MapPin } from "lucide-react";

type Props = {
  reservation: ReservationWithRelations;
};

const ReservationCard = ({ reservation }: Props) => {
  const customerName = reservation.customer
    ? `${reservation.customer.first_name} ${reservation.customer.last_name}`
    : "Customer unavailable";

  const paidAmount = reservation.payments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  return (
    <div
      key={reservation.id}
      className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
    >
      <div className="flex min-w-23 flex-col items-center justify-center rounded-md bg-muted px-3 py-3">
        <Clock3 className="mb-1 h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold">
          {formatTime(reservation.start_time)}
        </span>
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-medium">{customerName}</p>

          <Badge
            variant={getStatusVariant(reservation.status)}
            className="text-foreground"
          >
            {capitalize(reservation.status)}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {reservation.court?.name ?? "Court unavailable"}
          </span>

          <span>
            {formatTime(reservation.start_time)} –{" "}
            {formatTime(reservation.end_time)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          Paid: {currencyFormatter.format(paidAmount)}
          {" / "}
          {currencyFormatter.format(reservation.total_amount)}
        </p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="font-semibold">
          {currencyFormatter.format(reservation.total_amount)}
        </p>
        <p className="text-xs text-muted-foreground">Total amount</p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </div>
  );
};

export default ReservationCard;
