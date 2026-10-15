import type { CustomerQuery } from "@courtdesk/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../api/customer.api";

export const useCustomers = (params: CustomerQuery) => {
  return useInfiniteQuery({
    queryKey: ["customers", params],
    queryFn: ({ pageParam }) => fetchCustomers({ ...params, page: pageParam }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;

      const { page, total_pages } = lastPage?.pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },
  });
};
