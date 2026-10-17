import type { CourtStatus } from "@courtdesk/shared";

export const getCourtStatusClassName = (status: CourtStatus) => {
  switch (status) {
    case "active":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "maintenance":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "inactive":
      return "border-red-200 bg-red-50 text-red-700";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};
