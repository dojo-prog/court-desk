import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user.api";

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  });
};
