export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "#15803d";
    case "completed":
    case "paid":
      return "#0369a1";
    case "pending":
      return "#b45309";
    case "cancelled":
    case "canceled":
    case "rejected":
      return "#b91c1c";
    default:
      return "#64748b";
  }
};
