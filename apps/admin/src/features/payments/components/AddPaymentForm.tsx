import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePaymentBodySchema,
  PaymentMethodSchema,
  type CreatePaymentBody,
  type ReservationWithRelations,
} from "@courtdesk/shared";
import type { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ButtonLoader from "@/components/common/ButtonLoader";
import { currencyFormatter } from "@/utils/money/currencyFormatter";
import { useCreatePayment } from "../hooks/useCreatePayment";

import { Banknote, CreditCard, Wallet } from "lucide-react";
import { useEffect, useMemo } from "react";

type Props = {
  reservation: ReservationWithRelations;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddPaymentForm = ({ reservation, setOpen }: Props) => {
  const { mutateAsync: createPayment, isPending } = useCreatePayment();

  const totalPaid = reservation.payments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  const remainingBalance = Math.max(0, reservation.total_amount - totalPaid);

  const form = useForm<CreatePaymentBody>({
    resolver: zodResolver(CreatePaymentBodySchema),
    defaultValues: {
      reservationId: reservation.id,
      amount: 0,
      method: "cash",
    },
  });

  const amount = form.watch("amount");

  const amountNumber = Number(amount) || 0;

  const paymentMethods = PaymentMethodSchema.options;

  const isAmountValid =
    Number.isFinite(amountNumber) &&
    amountNumber > 0 &&
    amountNumber <= remainingBalance &&
    Math.round(amountNumber * 100) === amountNumber * 100;

  const remainingAfterPayment = useMemo(
    () => Math.max(0, remainingBalance - amountNumber),
    [remainingBalance, amountNumber],
  );

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (data: CreatePaymentBody) => {
    if (Number(data.amount) > remainingBalance) {
      form.setError("amount", {
        type: "validate",
        message: "Payment cannot exceed the remaining balance.",
      });
      return;
    }

    await createPayment({
      ...data,
      amount: Number(data.amount),
    });

    setOpen(false);
  };

  const methodIcons = {
    cash: Banknote,
    gcash: Wallet,
    card: CreditCard,
  } as const;

  return (
    <section className="space-y-5 rounded-xl border bg-card p-4 sm:p-5">
      {/* Form heading */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-semibold tracking-tight">Record a payment</h3>
          <p className="text-sm text-muted-foreground">
            Enter the amount received for this reservation.
          </p>
        </div>

        <Badge variant="outline" className="shrink-0">
          {reservation.payments.length}{" "}
          {reservation.payments.length === 1 ? "payment" : "payments"}
        </Badge>
      </div>

      {/* Balance summary */}
      <div className="space-y-3 rounded-lg bg-muted/50 p-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">
            Outstanding balance
          </span>
          <span className="text-lg font-semibold tabular-nums">
            {currencyFormatter.format(remainingBalance)}
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${
                reservation.total_amount > 0
                  ? Math.min(100, (totalPaid / reservation.total_amount) * 100)
                  : 100
              }%`,
            }}
          />
        </div>

        <div className="flex justify-between gap-3 text-xs text-muted-foreground">
          <span>Paid: {currencyFormatter.format(totalPaid)}</span>
          <span>
            Total: {currencyFormatter.format(reservation.total_amount)}
          </span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Payment method */}
        <div className="space-y-2">
          <Label htmlFor="payment-method">Payment method</Label>

          <Controller
            name="method"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <SelectTrigger
                    id="payment-method"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <SelectValue placeholder="Choose payment method" />
                  </SelectTrigger>

                  <SelectContent>
                    {paymentMethods.map((method) => {
                      const Icon =
                        methodIcons[method as keyof typeof methodIcons];

                      return (
                        <SelectItem key={method} value={method}>
                          <span className="flex items-center gap-2 capitalize">
                            {Icon && (
                              <Icon className="size-4 text-muted-foreground" />
                            )}
                            {method}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <FieldError errors={[fieldState.error]} />
              </>
            )}
          />
        </div>

        {/* Payment amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="payment-amount">Amount received</Label>

            <button
              type="button"
              className="text-xs font-medium text-primary hover:underline disabled:opacity-50"
              disabled={isPending || remainingBalance <= 0}
              onClick={() => {
                form.setValue("amount", remainingBalance, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            >
              Pay remaining balance
            </button>
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
              ₱
            </span>

            <Input
              id="payment-amount"
              type="number"
              inputMode="decimal"
              min="0.01"
              max={remainingBalance}
              step="0.01"
              placeholder="0.00"
              className="pl-8 text-base tabular-nums"
              disabled={isPending || remainingBalance <= 0}
              aria-invalid={!!form.formState.errors.amount}
              {...form.register("amount", {
                valueAsNumber: true,
                onChange: () => {
                  if (form.formState.errors.amount) {
                    form.clearErrors("amount");
                  }
                },
              })}
            />
          </div>

          <div className="flex items-start justify-between gap-3">
            <FieldError errors={[form.formState.errors.amount]} />

            <span className="shrink-0 text-xs text-muted-foreground">
              Max. {currencyFormatter.format(remainingBalance)}
            </span>
          </div>
        </div>

        {/* Remaining balance preview */}
        {amountNumber > 0 && isAmountValid && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed p-3">
            <span className="text-sm text-muted-foreground">
              Balance after payment
            </span>

            <span className="font-semibold tabular-nums">
              {currencyFormatter.format(remainingAfterPayment)}
            </span>
          </div>
        )}

        {/* Actions */}
        <DialogFooter className="gap-2 border-t pt-4 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isPending || !isAmountValid || remainingBalance <= 0}
            className="sm:min-w-36 text-foreground"
          >
            <ButtonLoader isLoading={isPending}>Save payment</ButtonLoader>
          </Button>
        </DialogFooter>
      </form>
    </section>
  );
};

export default AddPaymentForm;
