import type { UserQuery } from "@courtdesk/shared";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/user.api";

export const useUsers = (params: UserQuery) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  });
};
