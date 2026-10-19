import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ReservationAvailabilityQuerySchema,
  type CourtEntity,
  type ReservationAvailabilityQuery,
  type ReservationWithRelations,
} from "@courtdesk/shared";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ButtonLoader from "@/components/common/ButtonLoader";
import { checkAvailability } from "../api/reservation.api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  ChevronsUpDown,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
} from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import { useCourts } from "@/features/courts/hooks/useCourts";
import { useDebounce } from "@/hooks/useDebounce";
import { formatTime } from "@/utils/dates/formatTime";
import { formatDate } from "@/utils/dates/formatDate";
import { currencyFormatter } from "@/utils/money/currencyFormatter";
import { getStatusClassName } from "@/utils/variants/status/getStatusClassName";

type Props = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

type AvailabilityResult = {
  available: boolean;
  reservation?: ReservationWithRelations | null;
};

const fieldClassName = "space-y-2";

const CheckAvailabilityForm = ({ setDialogOpen }: Props) => {
  const [courtSearch, setCourtSearch] = useState("");
  const [courtPopoverOpen, setCourtPopoverOpen] = useState(false);
  const [selectedCourtName, setSelectedCourtName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [availabilityResult, setAvailabilityResult] =
    useState<AvailabilityResult | null>(null);

  const form = useForm<ReservationAvailabilityQuery>({
    resolver: zodResolver(ReservationAvailabilityQuerySchema),
    defaultValues: {
      courtId: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedCourtId = watch("courtId");

  const selectCourt = (court: CourtEntity) => {
    setValue("courtId", court.id, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setSelectedCourtName(court.name);
    setCourtSearch("");
    setCourtPopoverOpen(false);
  };

  const debouncedCourtSearch = useDebounce(courtSearch, 300);

  const {
    data: courtData,
    isPending: courtsPending,
    isError: courtsError,
  } = useCourts({
    search: debouncedCourtSearch,
  });

  const courts = courtData?.courts ?? [];

  const onSubmit = async (data: ReservationAvailabilityQuery) => {
    try {
      setIsPending(true);
      setAvailabilityResult(null);
      const result = await checkAvailability(data);
      setAvailabilityResult(result ?? null);
    } catch (error) {
      console.error("Failed to check availability", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Court Selection */}
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

      {/* Date */}
      <div className={fieldClassName}>
        <Label htmlFor="date">Reservation date</Label>

        <Input
          id="date"
          type="date"
          {...register("date")}
          aria-invalid={Boolean(errors.date)}
        />

        {errors.date && (
          <p className="text-sm text-destructive" role="alert">
            {String(errors.date.message)}
          </p>
        )}
      </div>

      {/* Start time & End time */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={fieldClassName}>
          <Label htmlFor="startTime">Start time</Label>

          <Input
            id="startTime"
            type="time"
            {...register("startTime")}
            aria-invalid={Boolean(errors.startTime)}
          />

          {errors.startTime && (
            <p className="text-sm text-destructive" role="alert">
              {String(errors.startTime.message)}
            </p>
          )}
        </div>

        <div className={fieldClassName}>
          <Label htmlFor="endTime">End time</Label>

          <Input
            id="endTime"
            type="time"
            {...register("endTime")}
            aria-invalid={Boolean(errors.endTime)}
          />

          {errors.endTime && (
            <p className="text-sm text-destructive" role="alert">
              {String(errors.endTime.message)}
            </p>
          )}
        </div>
      </div>

      {/* Availability Feedback Card */}
      {availabilityResult && (
        <div className="mt-4">
          {availabilityResult.available ? (
            /* Available Banner */
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-900 dark:text-emerald-200 text-sm">
              <CheckCircle2 className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div>
                <p className="font-semibold">Court is available!</p>
                <p className="text-xs opacity-90 mt-0.5">
                  Selected slot is free for booking on{" "}
                  {formatDate(watch("date"))}.
                </p>
              </div>
            </div>
          ) : (
            /* Booked / Conflict Banner & Details */
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-destructive/20 pb-3">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="size-5 shrink-0" />
                  <span className="font-semibold text-sm">
                    Court is unavailable
                  </span>
                </div>

                {availabilityResult.reservation && (
                  <Badge
                    variant="outline"
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusClassName(
                      availabilityResult.reservation.status,
                    )}`}
                  >
                    {availabilityResult.reservation.status}
                  </Badge>
                )}
              </div>

              {availabilityResult.reservation && (
                <div className="space-y-2.5 text-xs">
                  {/* Time & Date conflict */}
                  <div className="grid grid-cols-2 gap-2 text-muted-foreground bg-background/50 p-2.5 rounded-md border">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-foreground shrink-0" />
                      <span className="font-medium text-foreground truncate">
                        {formatTime(availabilityResult.reservation.start_time)}{" "}
                        – {formatTime(availabilityResult.reservation.end_time)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-foreground shrink-0" />
                      <span className="font-medium text-foreground truncate">
                        {formatDate(availabilityResult.reservation.date)}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  {availabilityResult.reservation.customer ? (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
                        Existing Reservation Details
                      </p>

                      <div className="flex items-center gap-2">
                        <User className="size-3.5 text-muted-foreground shrink-0" />
                        <span className="font-semibold text-foreground">
                          {availabilityResult.reservation.customer.first_name}{" "}
                          {availabilityResult.reservation.customer.last_name}
                        </span>
                      </div>

                      {availabilityResult.reservation.customer.email && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="size-3.5 shrink-0" />
                          <span className="truncate">
                            {availabilityResult.reservation.customer.email}
                          </span>
                        </div>
                      )}

                      {availabilityResult.reservation.customer.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="size-3.5 shrink-0" />
                          <span>
                            {availabilityResult.reservation.customer.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Customer details unavailable
                    </p>
                  )}

                  {/* Total Amount */}
                  <div className="flex justify-between items-center border-t pt-2 mt-2">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-semibold text-foreground">
                      {currencyFormatter.format(
                        Number(availabilityResult.reservation.total_amount),
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <DialogFooter className="pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setDialogOpen(false)}
          disabled={isPending}
        >
          Close
        </Button>

        <Button type="submit" disabled={isPending} className="px-4 text-white">
          <ButtonLoader isLoading={isPending}>Check Availability</ButtonLoader>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CheckAvailabilityForm;
