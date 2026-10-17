import { formatToday } from "@/utils/dates/formatToday";
import { CalendarDays } from "lucide-react";

type Props = {
  isPending: boolean;
};

const Header = ({ isPending }: Props) => {
  if (isPending) {
    <div className="space-y-2">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Loading dashboard data...</p>
    </div>;
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back. Here's an overview of your reservation system.
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        {formatToday()}
      </div>
    </div>
  );
};

export default Header;
