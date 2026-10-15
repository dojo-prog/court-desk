import type { ReservationQuery } from "@courtdesk/shared";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchReservations } from "../api/reservation.api";

export const useReservations = (params: ReservationQuery) => {
  return useInfiniteQuery({
    queryKey: ["reservations", params],
    queryFn: ({ pageParam }) =>
      fetchReservations({ ...params, page: pageParam }),

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
