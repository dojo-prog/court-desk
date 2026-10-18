import type { Dispatch, SetStateAction } from "react";

import type { CustomerQuery } from "@courtdesk/shared";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PenIcon, TrashIcon } from "lucide-react";
import type { FetchCustomersData } from "@/features/customers/types/customer.types";
import TablePagination from "@/components/common/TablePagination";
import { formatDateTimeToDate } from "@/utils/dates/formatDateTimeToDate";
import { getInitials } from "@/utils/getInitals";
import SearchInput from "@/components/common/SearchInput";

type Props = {
  data?: FetchCustomersData;
  isPending: boolean;
  isError: boolean;
  filters: CustomerQuery;
  setFilters: Dispatch<SetStateAction<CustomerQuery>>;
};

const CustomersTable = ({
  data,
  isPending,
  isError,
  filters,
  setFilters,
}: Props) => {
  const customers = data?.customers ?? [];
  const page = filters.page;
  const totalPages = Math.max(data?.pagination.total_pages ?? 1, 1);
  const totalCustomers = data?.pagination.total ?? customers.length;
  const columnCount = 5;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Table heading */}
      <div className="border-b px-5 py-4 space-y-4">
        <div className="flex flex-col gap-3  sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold tracking-tight">All customers</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Customer profiles and their reservation activity.
            </p>
          </div>

          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            {totalCustomers} {totalCustomers === 1 ? "customer" : "customers"}
          </Badge>
        </div>

        <SearchInput
          value={filters.search ?? ""}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, search: value }))
          }
          className="max-w-100"
          placeholder="Search customer name or email..."
        />
      </div>

      {/* Table content */}
      <div
        className="max-h-[calc(100vh-26rem)] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="h-11 min-w-56 pl-5">Customer</TableHead>

              <TableHead className="min-w-30">Phone</TableHead>

              <TableHead className="min-w-40 text-center">
                Reservations
              </TableHead>

              <TableHead className="min-w-40">Registered</TableHead>

              <TableHead className="min-w-40 text-right pr-10">
                Actions
              </TableHead>
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
                  <p className="font-medium">Unable to load customers</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Something went wrong while fetching customers. Please try
                    again.
                  </p>
                </TableCell>
              </TableRow>
            )}

            {/* Empty state */}
            {!isPending && !isError && customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-36 text-center">
                  <p className="font-medium">No customers found</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Registered customers will appear here.
                  </p>
                </TableCell>
              </TableRow>
            )}

            {/* Customer rows */}
            {!isPending &&
              !isError &&
              customers.map((customer) => {
                const fullName = `${customer.first_name} ${customer.last_name}`;

                return (
                  <TableRow
                    key={customer.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* Customer name */}
                    <TableCell className="py-4 pl-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {getInitials(customer.first_name, customer.last_name)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">{fullName}</p>

                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Phone */}
                    <TableCell>
                      <span className="whitespace-nowrap text-xs">
                        {customer.phone || "—"}
                      </span>
                    </TableCell>

                    {/* Reservation count */}
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className="min-w-9 justify-center rounded-full tabular-nums"
                      >
                        {customer.reservations_count}
                      </Badge>
                    </TableCell>

                    {/* Registration date */}
                    <TableCell>
                      <span className="whitespace-nowrap text-xs">
                        {formatDateTimeToDate(customer.created_at)}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-10">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant={"ghost"}>
                          <PenIcon />
                        </Button>
                        <Button variant={"destructive"}>
                          <TrashIcon />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isPending && !isError && customers.length > 0 && (
        <TablePagination
          page={page}
          totalPages={totalPages}
          setFilters={setFilters as any}
        />
      )}
    </div>
  );
};

export default CustomersTable;
