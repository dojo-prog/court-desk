export const getPaymentStatusClassName = (status: string) => {
  switch (status.toLowerCase()) {
    case "fully paid":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "partial":
      return "border-sky-200 bg-sky-50 text-sky-700";

    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-700";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};
