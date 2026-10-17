import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, CalendarX2 } from "lucide-react";
import type { ReservationWithRelations } from "@courtdesk/shared";
import ReservationCard from "@/features/reservations/components/ReservationCard";

type Props = {
  reservations_today: ReservationWithRelations[];
  isPending: boolean;
};

const ReservationsToday = ({ reservations_today, isPending }: Props) => {
  if (isPending) {
    return (
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="h-5 w-48 animate-pulse rounded bg-muted" />
          <div className="h-20 animate-pulse rounded bg-muted" />
          <div className="h-20 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {/* Container Header */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Today's Reservations
        </CardTitle>

        <CardDescription>
          View today's court bookings and their payment progress.
        </CardDescription>
      </CardHeader>

      {/* Reservations List */}
      <CardContent>
        {reservations_today.length === 0 ? (
          <div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6 text-center">
            <div className="rounded-full bg-muted p-3">
              <CalendarX2 className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold">No reservations today</h3>
              <p className="text-sm text-muted-foreground">
                There are no reservations scheduled for today.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations_today.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        )}

        {/* Reservation count */}
        {reservations_today.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
            <span>
              {reservations_today.length} reservation
              {reservations_today.length === 1 ? "" : "s"} today
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReservationsToday;
