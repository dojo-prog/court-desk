import { useState } from "react";

import type { PaymentQuery } from "@courtdesk/shared";
import { usePayments } from "@/features/payments/hooks/usePayments";
import Header from "./payments/Header";
import PaymentsTable from "./payments/PaymentsTable";

const PaymentsPage = () => {
  const [filters, setFilters] = useState<PaymentQuery>({
    page: 1,
    limit: 10,
    search: "",
  });

  const { data, isPending, isError } = usePayments(filters);

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
