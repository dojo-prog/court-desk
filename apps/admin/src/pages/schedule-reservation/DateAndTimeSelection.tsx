import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  UseFormClearErrors,
} from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateAndTimeSelectionProps {
  fieldClassName: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
}

export const DateAndTimeSelection = ({
  fieldClassName,
  register,
  errors,
  watch,
  setValue,
  clearErrors,
}: DateAndTimeSelectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Date and time</CardTitle>
        <CardDescription>
          Choose when the reservation starts and how long it lasts. Reservations
          must end before midnight.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 sm:grid-cols-3">
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
          <Label htmlFor="duration">Duration</Label>

          <Select
            value={String(watch("duration") ?? "")}
            onValueChange={(value) => {
              setValue("duration", Number(value), {
                shouldValidate: true,
                shouldDirty: true,
              });
              clearErrors("duration");
            }}
          >
            <SelectTrigger
              id="duration"
              aria-invalid={Boolean(errors.duration)}
            >
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>

            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hours) => (
                <SelectItem key={hours} value={String(hours)}>
                  {hours} {hours === 1 ? "hour" : "hours"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.duration && (
            <p className="text-sm text-destructive" role="alert">
              {String(errors.duration.message)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
