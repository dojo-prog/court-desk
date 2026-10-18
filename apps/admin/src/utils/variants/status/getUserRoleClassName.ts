import type { UserRole } from "@courtdesk/shared";

export const getUserRoleClassName = (role: UserRole) => {
  switch (role) {
    case "admin":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "staff":
      return "border-amber-200 bg-amber-50 text-amber-700";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};
