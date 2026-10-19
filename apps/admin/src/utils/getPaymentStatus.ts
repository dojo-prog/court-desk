export const getPaymentStatus = (
  totalAmount: number,
  totalPaid: number,
): "pending" | "partial" | "fully paid" => {
  return totalPaid === 0
    ? "pending"
    : totalPaid < totalAmount
      ? "partial"
      : "fully paid";
};
