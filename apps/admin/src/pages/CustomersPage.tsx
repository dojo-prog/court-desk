import { useState } from "react";

import type { CustomerQuery } from "@courtdesk/shared";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import CustomersTable from "./customers/CustomersTable";
import Header from "./customers/Header";
import { useDebounce } from "@/hooks/useDebounce";

const CustomersPage = () => {
  const [filters, setFilters] = useState<CustomerQuery>({
    page: 1,
    limit: 10,
    sortBy: "newest",
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search);

  const { data, isPending, isError } = useCustomers({
    ...filters,
    search: debouncedSearch,
  });

  return (
    <div className="space-y-6">
      <Header />

      <CustomersTable
        data={data}
        isPending={isPending}
        isError={isError}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default CustomersPage;
