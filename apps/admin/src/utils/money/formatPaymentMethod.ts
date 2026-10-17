import type { PaymentMethod } from "@courtdesk/shared";

export const formatPaymentMethod = (method: PaymentMethod) => {
  const labels: Record<PaymentMethod, string> = {
    cash: "Cash",
    gcash: "GCash",
    bank_transfer: "Bank transfer",
    card: "Card",
  };

  return labels[method];
};
