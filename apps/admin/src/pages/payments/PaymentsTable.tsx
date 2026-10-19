import type { Dispatch, SetStateAction } from "react";

import type { PaymentQuery, PaymentWithRelations } from "@courtdesk/shared";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/common/TablePagination";
import { currencyFormatter } from "@/utils/money/currencyFormatter";
import { formatDateTime } from "@/utils/dates/formatDateTime";
import { formatPaymentMethod } from "@/utils/money/formatPaymentMethod";
import SearchInput from "@/components/common/SearchInput";

type PaymentsResponse = {
  payments: PaymentWithRelations[];
  pagination: {
    total_pages: number;
    total?: number;
  };
};

type Props = {
  data: PaymentsResponse | undefined;
  isPending: boolean;
  isError: boolean;
  filters: PaymentQuery;
  setFilters: Dispatch<SetStateAction<PaymentQuery>>;
};

const PaymentsTable = ({
  data,
  isPending,
  isError,
  filters,
  setFilters,
}: Props) => {
  const payments = data?.payments ?? [];
  const page = filters.page;
  const totalPages = Math.max(data?.pagination.total_pages ?? 1, 1);
  const totalPayments = data?.pagination.total ?? payments.length;
  const columnCount = 6;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Table header */}
      <div className="border-b px-5 py-4 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold tracking-tight">All payments</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              View payment records and their associated reservations.
            </p>
          </div>

          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            {totalPayments} {totalPayments === 1 ? "payment" : "payments"}
          </Badge>
        </div>

        {/* Filters bar */}
        <SearchInput
          value={filters.search ?? ""}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, search: value, page: 1 }))
          }
          wrapperClassName="max-w-100"
          placeholder="Search customer name or email..."
        />
      </div>

      {/* Table content */}
      <div
        className="max-h-[calc(100vh-24rem)] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="h-11 min-w-55 pl-5">Customer</TableHead>

              <TableHead className="min-w-44">Court</TableHead>

              <TableHead className="min-w-52">Payment date</TableHead>

              <TableHead className="min-w-36">Method</TableHead>

              <TableHead className="min-w-48">Recorded by</TableHead>

              <TableHead className="min-w-36 pr-5 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading state */}
            {isPending &&
              Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: columnCount }).map((_, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cellIndex === 0 ? "pl-5" : ""}
                    >
                      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {/* Error state */}
            {!isPending && isError && (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-36 text-center">
                  <p className="font-medium">Unable to load payments</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Something went wrong while fetching payments. Please try
                    again.
                  </p>
                </TableCell>
              </TableRow>
            )}

            {/* Empty state */}
            {!isPending && !isError && payments.length === 0 && (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-36 text-center">
                  <p className="font-medium">No payments yet</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Payment records will appear here when payments are recorded.
                  </p>
                </TableCell>
              </TableRow>
            )}

            {/* Payment rows */}
            {!isPending &&
              !isError &&
              payments.map((payment) => {
                const customer = payment.reservation?.customer;
                const court = payment.reservation?.court;
                const staff = payment.recorded_by;

                const customerName = customer
                  ? `${customer.first_name} ${customer.last_name}`
                  : "Customer unavailable";

                const customerInitials = customer
                  ? `${customer.first_name.charAt(0)}${customer.last_name.charAt(0)}`.toUpperCase()
                  : "—";

                const staffName = staff
                  ? `${staff.first_name} ${staff.last_name}`
                  : "Staff unavailable";

                const staffInitials = staff
                  ? `${staff.first_name.charAt(0)}${staff.last_name.charAt(0)}`.toUpperCase()
                  : "—";

                return (
                  <TableRow
                    key={payment.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* Customer */}
                    <TableCell className="py-4 pl-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {customerInitials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">{customerName}</p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Payment
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Court */}
                    <TableCell>
                      <span className="font-medium">
                        {court?.name ?? "Court unavailable"}
                      </span>
                    </TableCell>

                    {/* Payment date */}
                    <TableCell>
                      <span className="whitespace-nowrap text-sm font-medium">
                        {formatDateTime(payment.paid_at)}
                      </span>
                    </TableCell>

                    {/* Payment method */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="rounded-full px-2.5 py-1 font-medium"
                      >
                        {formatPaymentMethod(payment.method)}
                      </Badge>
                    </TableCell>

                    {/* Recorded by */}
                    <TableCell>
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                          {staffInitials}
                        </div>

                        <span className="truncate font-medium">
                          {staffName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="pr-5 text-right">
                      <span className="whitespace-nowrap font-semibold tabular-nums">
                        {currencyFormatter.format(Number(payment.amount))}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isPending && !isError && payments.length > 0 && (
        <TablePagination
          page={page}
          totalPages={totalPages}
          setFilters={setFilters}
        />
      )}
    </div>
  );
};

export default PaymentsTable;
