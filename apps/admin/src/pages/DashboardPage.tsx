import { useDashboardOverview } from "@/features/dashboard/hooks/useDashboardOverview";

import Header from "./dashboard/Header";
import OverviewStats from "./dashboard/OverviewStats";
import ReservationsToday from "./dashboard/ReservationsToday";
import DashboardErrorState from "./dashboard/DashboardErrorState";

const DashboardPage = () => {
  const { data, isPending, isError } = useDashboardOverview();

  if (isError || !data) return <DashboardErrorState />;

  const { stats, reservations_today } = data;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6 lg:p-8">
      <Header isPending={isPending} />
      <OverviewStats stats={stats} isPending={isPending} />
      <ReservationsToday
        reservations_today={reservations_today}
        isPending={isPending}
      />
    </main>
  );
};

export default DashboardPage;
