import { useState } from "react";
import { useReservations } from "@/features/reservations/hooks/useReservations";

import type { ReservationQuery } from "@courtdesk/shared";

import Header from "./reservations/Header";
import ReservationsTable from "./reservations/ReservationsTable";

const ReservationsPage = () => {
  const [filters, setFilters] = useState<ReservationQuery>({
    page: 1,
    limit: 10,
    sortBy: "newest",
    search: "",
  });

  const { data, isPending, isError } = useReservations(filters);

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <Header />

      {/* Reservations table */}
      <ReservationsTable
        data={data}
        isPending={isPending}
        isError={isError}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default ReservationsPage;
