import type { PaymentQuery } from "@courtdesk/shared";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPayments } from "../api/payment.api";

export const usePayments = (params: PaymentQuery) => {
  return useInfiniteQuery({
    queryKey: ["payments", params],
    queryFn: ({ pageParam }) => fetchPayments({ ...params, page: pageParam }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;

      const { page, total_pages } = lastPage.pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },

    placeholderData: keepPreviousData,
  });
};
