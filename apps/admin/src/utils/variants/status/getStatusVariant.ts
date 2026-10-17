export const getStatusVariant = (
  status: string,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status.toLowerCase()) {
    case "confirmed":
    case "completed":
    case "paid":
      return "default";

    case "pending":
      return "secondary";

    case "cancelled":
    case "canceled":
    case "rejected":
      return "destructive";

    default:
      return "outline";
  }
};
