import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { currencyFormatter } from "@/utils/money/currencyFormatter";
import { CalendarCheck, UserRound, Users, Wallet } from "lucide-react";

type Props = {
  stats: {
    users: number;
    customers: number;
    reservations: number;
    revenue: number;
  };
  isPending: boolean;
};

const OverviewStats = ({ stats, isPending }: Props) => {
  if (!stats) return null;

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-3 p-6">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-8 w-32 animate-pulse rounded bg-muted" />
              <div className="h-3 w-40 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section
      aria-label="Business overview"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <StatCard
        title="Total Users"
        value={stats.users.toLocaleString("en-PH")}
        description="Registered system accounts"
        icon={Users}
      />

      <StatCard
        title="Customers"
        value={stats.customers.toLocaleString("en-PH")}
        description="Registered customers"
        icon={UserRound}
      />

      <StatCard
        title="Reservations"
        value={stats.reservations.toLocaleString("en-PH")}
        description="All-time reservations"
        icon={CalendarCheck}
      />

      <StatCard
        title="Revenue"
        value={currencyFormatter.format(stats.revenue)}
        description="Total recorded revenue"
        icon={Wallet}
      />
    </section>
  );
};

export default OverviewStats;
