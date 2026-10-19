import { useState } from "react";
import type {
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import SearchInput from "@/components/common/SearchInput";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { useCourts } from "@/features/courts/hooks/useCourts";
import { useDebounce } from "@/hooks/useDebounce";

interface CustomerAndCourtSelectionProps {
  fieldClassName: string;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  selectedCustomerName: string;
  setSelectedCustomerName: (name: string) => void;
  selectedCourtName: string;
  setSelectedCourtName: (name: string) => void;
  customerSearch: string;
  setCustomerSearch: (search: string) => void;
  courtSearch: string;
  setCourtSearch: (search: string) => void;
}

export const CustomerAndCourtSelection = ({
  fieldClassName,
  errors,
  watch,
  setValue,
  clearErrors,
  selectedCustomerName,
  setSelectedCustomerName,
  selectedCourtName,
  setSelectedCourtName,
  customerSearch,
  setCustomerSearch,
  courtSearch,
  setCourtSearch,
}: CustomerAndCourtSelectionProps) => {
  const debouncedCustomerSearch = useDebounce(customerSearch);
  const debouncedCourtSearch = useDebounce(courtSearch);

  const [customerPopoverOpen, setCustomerPopoverOpen] = useState(false);
  const [courtPopoverOpen, setCourtPopoverOpen] = useState(false);

  const selectedCustomerId = watch("customerId");
  const selectedCourtId = watch("courtId");

  const {
    data: customerData,
    isPending: customersPending,
    isError: customersError,
  } = useCustomers({
    page: 1,
    limit: 10,
    search: debouncedCustomerSearch,
    sortBy: "newest",
  });

  const {
    data: courtData,
    isPending: courtsPending,
    isError: courtsError,
  } = useCourts({
    search: debouncedCourtSearch,
  });

  const customers = customerData?.customers ?? [];
  const courts = courtData?.courts ?? [];

  const selectCustomer = (customer: (typeof customers)[number]) => {
    setValue("customerId", customer.id, {
      shouldValidate: true,
      shouldDirty: true,
    });
    clearErrors("customerId");
    setSelectedCustomerName(`${customer.first_name} ${customer.last_name}`);
    setCustomerSearch("");
    setCustomerPopoverOpen(false);
  };

  const selectCourt = (court: (typeof courts)[number]) => {
    setValue("courtId", court.id, {
      shouldValidate: true,
      shouldDirty: true,
    });
    clearErrors("courtId");
    setSelectedCourtName(court.name);
    setCourtSearch("");
    setCourtPopoverOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservation details</CardTitle>
        <CardDescription>
          Search for and select the customer and court for this reservation.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 sm:grid-cols-2">
        {/* Customer */}
        <div className={fieldClassName}>
          <Label htmlFor="customer-search">Customer</Label>

          <Popover
            open={customerPopoverOpen}
            onOpenChange={setCustomerPopoverOpen}
          >
            <PopoverTrigger>
              <Button
                id="customer-search"
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={customerPopoverOpen}
                aria-invalid={Boolean(errors.customerId)}
                className="w-full justify-between font-normal"
              >
                <span className="truncate">
                  {selectedCustomerName || "Search customers..."}
                </span>

                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-[--radix-popover-trigger-width] p-2"
            >
              <SearchInput
                value={customerSearch}
                onChange={setCustomerSearch}
                onClear={() => setCustomerSearch("")}
                isLoading={customersPending}
                placeholder="Search by customer name..."
                autoFocus
              />

              <div className="mt-2 max-h-60 overflow-y-auto">
                {customersPending && (
                  <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                    Searching customers...
                  </p>
                )}

                {!customersPending && customersError && (
                  <p className="px-3 py-6 text-center text-sm text-destructive">
                    Unable to load customers.
                  </p>
                )}

                {!customersPending &&
                  !customersError &&
                  customers.length === 0 && (
                    <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                      No customers found.
                    </p>
                  )}

                {!customersPending &&
                  !customersError &&
                  customers.map((customer) => (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => selectCustomer(customer)}
                      className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-medium">
                          {customer.first_name} {customer.last_name}
                        </span>

                        <span className="block truncate text-xs text-muted-foreground">
                          {customer.email ||
                            customer.phone ||
                            "No contact information"}
                        </span>
                      </span>

                      {selectedCustomerId === customer.id && (
                        <Check className="size-4 shrink-0" />
                      )}
                    </button>
                  ))}
              </div>
            </PopoverContent>
          </Popover>

          {errors.customerId && (
            <p className="text-sm text-destructive" role="alert">
              {String(errors.customerId.message)}
            </p>
          )}
        </div>

        {/* Court */}
        <div className={fieldClassName}>
          <Label htmlFor="court-search">Court</Label>

          <Popover open={courtPopoverOpen} onOpenChange={setCourtPopoverOpen}>
            <PopoverTrigger>
              <Button
                id="court-search"
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={courtPopoverOpen}
                aria-invalid={Boolean(errors.courtId)}
                className="w-full justify-between font-normal"
              >
                <span className="truncate">
                  {selectedCourtName || "Search courts..."}
                </span>

                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-[--radix-popover-trigger-width] p-2"
            >
              <SearchInput
                value={courtSearch}
                onChange={setCourtSearch}
                onClear={() => setCourtSearch("")}
                isLoading={courtsPending}
                placeholder="Search courts..."
                autoFocus
              />

              <div className="mt-2 max-h-60 overflow-y-auto">
                {courtsPending && (
                  <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                    Searching courts...
                  </p>
                )}

                {!courtsPending && courtsError && (
                  <p className="px-3 py-6 text-center text-sm text-destructive">
                    Unable to load courts.
                  </p>
                )}

                {!courtsPending && !courtsError && courts.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No courts found.
                  </p>
                )}

                {!courtsPending &&
                  !courtsError &&
                  courts.map((court) => (
                    <button
                      key={court.id}
                      type="button"
                      onClick={() => selectCourt(court)}
                      className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="truncate font-medium">{court.name}</span>

                      {selectedCourtId === court.id && (
                        <Check className="size-4 shrink-0" />
                      )}
                    </button>
                  ))}
              </div>
            </PopoverContent>
          </Popover>

          {errors.courtId && (
            <p className="text-sm text-destructive" role="alert">
              {String(errors.courtId.message)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
