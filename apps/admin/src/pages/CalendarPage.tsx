import { useMemo, useState } from "react";
import type { ReservationWithRelations } from "@courtdesk/shared";
import { useDashboardOverview } from "@/features/dashboard/hooks/useDashboardOverview";
import { getStatusColor } from "@/utils/variants/status/getStatusColor";
import { CalendarX2 } from "lucide-react";

import type { EventClickInfo, EventInput } from "@fullcalendar/react";
import { EventCalendar } from "@/components/event-calendar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CalendarLoadingState from "./calendar/CalendarLoadingState";
import CalendarErrorState from "./calendar/CalendarErrorState";
import ReservationDetailsDialog from "@/features/reservations/components/ReservationDetailsDialog";

export default function CalendarPage() {
  const { data, isPending, isError } = useDashboardOverview();

  const [selectedReservation, setSelectedReservation] =
    useState<ReservationWithRelations | null>(null);

  const reservations = data?.reservations_today ?? [];

  const events = useMemo<EventInput[]>(
    () =>
      reservations.map((reservation) => ({
        id: reservation.id,
        title: reservation.customer
          ? `${reservation.customer.first_name} ${reservation.customer.last_name}`
          : "Customer unavailable",
        start: `${reservation.date}T${reservation.start_time}`,
        end: `${reservation.date}T${reservation.end_time}`,
        backgroundColor: getStatusColor(reservation.status),
        borderColor: getStatusColor(reservation.status),
        textColor: "#ffffff",
        extendedProps: {
          reservation,
        },
      })),
    [reservations],
  );

  function handleEventClick(info: EventClickInfo) {
    const reservation = info.event.extendedProps.reservation as
      | ReservationWithRelations
      | undefined;

    if (reservation) {
      setSelectedReservation(reservation);
    }
  }

  if (isPending) return <CalendarLoadingState />;

  if (isError || !data) return <CalendarErrorState />;

  return (
    <>
      <main className="mx-auto w-full max-w-[1600px] space-y-6 p-4 md:p-6 lg:p-8">
        {/* Reservation calendar */}
        <Card className="overflow-hidden gap-0 py-0">
          <CardHeader className="border-b px-4 py-4 md:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold">
                  Reservation Schedule
                </CardTitle>
                <CardDescription>
                  Select a booking to view customer and payment details.
                </CardDescription>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {[
                  { label: "Confirmed", color: "#15803d" },
                  { label: "Pending", color: "#b45309" },
                  { label: "Completed / Paid", color: "#0369a1" },
                  { label: "Cancelled", color: "#b91c1c" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="min-w-0 p-3 ">
            {reservations.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6 text-center">
                <div className="rounded-full bg-muted p-3">
                  <CalendarX2 className="size-6 text-muted-foreground" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium">No reservations today</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    There are no bookings to display for today.
                  </p>
                </div>
              </div>
            ) : (
              <div className="calendar-page min-w-0">
                <EventCalendar
                  availableViews={[
                    "timeGridDay",
                    "timeGridWeek",
                    "dayGridMonth",
                  ]}
                  initialDate={reservations[0]?.date}
                  events={events}
                  eventClick={handleEventClick}
                  eventDisplay="block"
                  height="auto"
                  nowIndicator
                  allDaySlot={false}
                  slotMinTime="06:00:00"
                  slotMaxTime="23:00:00"
                  slotDuration="00:30:00"
                  scrollTime="08:00:00"
                  expandRows
                  dayMaxEvents
                  weekends
                  displayEventTime
                  eventTimeFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: "short",
                  }}
                  eventContent={(info) => {
                    const reservation = info.event.extendedProps.reservation as
                      | ReservationWithRelations
                      | undefined;

                    return (
                      <div className="min-w-0 overflow-hidden px-1.5 py-1 text-xs leading-relaxed text-foreground">
                        <div className="truncate font-semibold">
                          {info.timeText}
                        </div>

                        <div className="truncate font-medium">
                          {info.event.title}
                        </div>

                        {info.view.type !== "dayGridMonth" && (
                          <div className="truncate opacity-90">
                            {reservation?.court?.name ?? "Court unavailable"}
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Reservation Details Dialog */}
      {selectedReservation && (
        <ReservationDetailsDialog
          selectedReservation={selectedReservation}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedReservation(null);
            }
          }}
        />
      )}
    </>
  );
}
