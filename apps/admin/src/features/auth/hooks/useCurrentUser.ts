import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api/auth.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
  });
};
