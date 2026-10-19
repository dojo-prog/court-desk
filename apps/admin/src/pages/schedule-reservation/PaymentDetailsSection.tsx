import type { UseFormRegister, FieldErrors } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentDetailsSectionProps {
  fieldClassName: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export const PaymentDetailsSection = ({
  fieldClassName,
  register,
  errors,
}: PaymentDetailsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment details</CardTitle>
        <CardDescription>
          Enter the total reservation price and minimum payment.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 sm:grid-cols-2">
        <div className={fieldClassName}>
          <Label htmlFor="totalAmount">Total amount (₱)</Label>

          <Input
            id="totalAmount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            {...register("totalAmount", { valueAsNumber: true })}
            aria-invalid={Boolean(errors.totalAmount)}
          />

          {errors.totalAmount && (
            <p className="text-sm text-destructive" role="alert">
              {String(errors.totalAmount.message)}
            </p>
          )}
        </div>

        <div className={fieldClassName}>
          <Label htmlFor="minimumPayment">Minimum payment (₱)</Label>

          <Input
            id="minimumPayment"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            {...register("minimumPayment", { valueAsNumber: true })}
            aria-invalid={Boolean(errors.minimumPayment)}
          />

          {errors.minimumPayment && (
            <p className="text-sm text-destructive" role="alert">
              {String(errors.minimumPayment.message)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
