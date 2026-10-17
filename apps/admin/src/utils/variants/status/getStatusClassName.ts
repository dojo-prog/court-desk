export const getStatusClassName = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "completed":
    case "paid":
      return "border-sky-200 bg-sky-50 text-sky-700";

    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "cancelled":
    case "canceled":
    case "rejected":
      return "border-red-200 bg-red-50 text-red-700";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};
