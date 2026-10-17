import { useState } from "react";
import Header from "./courts/Header";
import type { CourtQuery } from "@courtdesk/shared";
import { useCourts } from "@/features/courts/hooks/useCourts";
import CourtList from "./courts/CourtList";
import SearchInput from "@/components/common/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";

const CourtsPage = () => {
  const [filters, setFilters] = useState<CourtQuery>({
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const { data, isPending, isError } = useCourts({
    ...filters,
    search: debouncedSearch,
  });

  const courts = data?.courts ?? [];

  return (
    <div className="space-y-6">
      <Header />

      <SearchInput
        value={filters.search ?? ""}
        onChange={(value) => setFilters((prev) => ({ ...prev, search: value }))}
        placeholder="Search court name..."
        className="max-w-130"
      />

      <CourtList courts={courts} isPending={isPending} isError={isError} />
    </div>
  );
};

export default CourtsPage;
