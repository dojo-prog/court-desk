import { useState } from "react";

import type { PaymentQuery } from "@courtdesk/shared";
import { usePayments } from "@/features/payments/hooks/usePayments";
import Header from "./payments/Header";
import PaymentsTable from "./payments/PaymentsTable";
import { useDebounce } from "@/hooks/useDebounce";

const PaymentsPage = () => {
  const [filters, setFilters] = useState<PaymentQuery>({
    page: 1,
    limit: 10,
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search);

  const { data, isPending, isError } = usePayments({
    ...filters,
    search: debouncedSearch,
  });

  return (
    <div className="space-y-6">
      <Header />

      <PaymentsTable
        data={data}
        isPending={isPending}
        isError={isError}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default PaymentsPage;
