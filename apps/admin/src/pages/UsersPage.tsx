import { useUsers } from "@/features/users/hooks/useUsers";
import { useDebounce } from "@/hooks/useDebounce";
import type { UserQuery } from "@courtdesk/shared";
import { useState } from "react";
import Header from "./users/Header";
import UsersTable from "./users/UsersTable";

const UsersPage = () => {
  const [filters, setFilters] = useState<UserQuery>({
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search);

  const { data, isPending, isError } = useUsers({
    search: debouncedSearch,
  });

  const users = data?.users ?? [];

  return (
    <div className="space-y-6">
      <Header />

      <UsersTable
        users={users}
        isPending={isPending}
        isError={isError}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default UsersPage;
