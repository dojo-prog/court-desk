import { useState, type Dispatch, type SetStateAction } from "react";
import type { FetchReservationsData } from "@/features/reservations/types/reservation.types";
import type {
  ReservationQuery,
  ReservationWithRelations,
} from "@courtdesk/shared";

import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/utils/dates/formatDate";
import { formatTime } from "@/utils/dates/formatTime";
import { currencyFormatter } from "@/utils/money/currencyFormatter";
import { getStatusClassName } from "@/utils/variants/status/getStatusClassName";
import { getDurationInHours } from "@/utils/dates/getDurationInHours";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPaymentStatusClassName } from "@/utils/variants/status/getPaymentStatusClassName";
import TablePagination from "@/components/common/TablePagination";
import ReservationDetailsDialog from "@/features/reservations/components/ReservationDetailsDialog";
import { getPaymentStatus } from "@/utils/getPaymentStatus";
import { getTotalPaid } from "@/utils/getTotalPaid";

type Props = {
  data?: FetchReservationsData;
  isPending: boolean;
  isError: boolean;
  filters: ReservationQuery;
  setFilters: Dispatch<SetStateAction<ReservationQuery>>;
};

const ReservationsTable = ({
  data,
  isPending,
  isError,
  filters,
  setFilters,
}: Props) => {
  const { page } = filters;

  const [detailsDialogOpen, setDetailsDialogOpen] = useState<boolean>(false);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationWithRelations | null>(null);

  const reservations: ReservationWithRelations[] = data?.reservations ?? [];

  const totalPages = data?.pagination.total_pages ?? 1;
  const totalReservations = data?.pagination.total ?? reservations.length;

  return (
    <>
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {/* Table heading */}
        <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold tracking-tight">All reservations</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              View and manage court bookings.
            </p>
          </div>

          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            {totalReservations} reservations
          </Badge>
        </div>

        {/* Table content */}
        <div
          className="max-h-[calc(100vh-24rem)] overflow-x-auto"
          style={{ scrollbarWidth: "thin" }}
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 min-w-55 pl-5">Customer</TableHead>
                <TableHead className="min-w-28">Court</TableHead>
                <TableHead className="min-w-55">Date</TableHead>
                <TableHead className="min-w-">Schedule</TableHead>
                <TableHead className="min-w-32.5 text-right">
                  Total amount
                </TableHead>
                <TableHead className="min-w-31.25 pl-5">Status</TableHead>
                <TableHead className="min-w-45 pl-5">Payment Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Loading state */}
              {false && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <span className="text-sm text-muted-foreground">
                      Loading reservations...
                    </span>
                  </TableCell>
                </TableRow>
              )}

              {/* Error state */}
              {!isPending && isError && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <p className="font-medium">Unable to load reservations</p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Please try again.
                    </p>
                  </TableCell>
                </TableRow>
              )}

              {/* Empty state */}
              {!isPending && !isError && reservations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-36 text-center">
                    <p className="font-medium">No reservations yet</p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Reservations will appear here when they are created.
                    </p>
                  </TableCell>
                </TableRow>
              )}

              {/* Reservation rows */}
              {!isPending &&
                !isError &&
                reservations.map((reservation) => {
                  const customer = reservation.customer;

                  const customerInitials = customer
                    ? `${customer.first_name.charAt(0)}${customer.last_name.charAt(0)}`.toUpperCase()
                    : "—";

                  const customerName = customer
                    ? `${customer.first_name} ${customer.last_name}`
                    : "Customer Unavailable";

                  const duration = getDurationInHours(
                    reservation.start_time,
                    reservation.end_time,
                  );

                  const paymentStatus = getPaymentStatus(
                    reservation.total_amount,
                    getTotalPaid(reservation),
                  );

                  return (
                    <TableRow
                      key={reservation.id}
                      className="transition-colors hover:bg-muted/30 cursor-pointer"
                      onClick={() => {
                        setSelectedReservation(reservation);
                        setDetailsDialogOpen(true);
                      }}
                    >
                      {/* Customer */}
                      <TableCell className="py-4 pl-5">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {customerInitials}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {customerName}
                            </p>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Reservation
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Court */}
                      <TableCell>
                        <span className="font-medium text-xs">
                          {reservation.court?.name ?? "Court unavailable"}
                        </span>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        <span className="font-medium text-xs">
                          {formatDate(reservation.date)}
                        </span>
                      </TableCell>

                      {/* Schedule */}
                      <TableCell>
                        <div className="space-y-1">
                          <p className="whitespace-nowrap text-sm font-medium">
                            {formatTime(reservation.start_time)} –{" "}
                            {formatTime(reservation.end_time)}
                          </p>

                          <p className="text-xs text-primary">
                            {duration.toFixed(1)}{" "}
                            {duration === 1 ? "hour" : "hours"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Total amount */}
                      <TableCell className="text-right">
                        <span className="font-semibold tabular-nums">
                          {currencyFormatter.format(
                            Number(reservation.total_amount),
                          )}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="pl-5">
                        <Badge
                          variant="outline"
                          className={`rounded-full px-2.5 py-1 font-medium capitalize ${getStatusClassName(reservation.status)}`}
                        >
                          <span className="mr-1.5 inline-block size-1.5 rounded-full bg-current" />

                          {reservation.status}
                        </Badge>
                      </TableCell>

                      {/* Payment Status */}
                      <TableCell className="pl-5">
                        <Badge
                          variant="outline"
                          className={`rounded-full px-2.5 py-1 font-medium capitalize ${getPaymentStatusClassName(paymentStatus)}`}
                        >
                          <span className="mr-1.5 inline-block size-1.5 rounded-full bg-current" />

                          {paymentStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!isPending && !isError && reservations.length > 0 && (
          <TablePagination
            page={page}
            totalPages={totalPages}
            setFilters={setFilters}
          />
        )}
      </div>

      {detailsDialogOpen && selectedReservation && (
        <ReservationDetailsDialog
          selectedReservation={selectedReservation}
          onOpenChange={setDetailsDialogOpen}
        />
      )}
    </>
  );
};

export default ReservationsTable;
