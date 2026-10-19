import type { ReservationWithRelations } from "@courtdesk/shared";

export const getTotalPaid = (reservation: ReservationWithRelations) => {
  return (
    reservation?.payments.reduce(
      (total, payment) => total + payment.amount,
      0,
    ) ?? 0
  );
};
