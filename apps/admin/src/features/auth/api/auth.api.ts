import { api } from "@/lib/axios/client";
import type { LoginBody } from "@courtdesk/shared";
import type {
  FetchCurrrentUserResponse,
  LoginResponse,
} from "../types/auth.types";

export const fetchCurrentUser = async () => {
  const { data } = await api.get<FetchCurrrentUserResponse>("/v1/auth/me");

  return data.data;
};

export const login = async (body: LoginBody) => {
  const { data } = await api.post<LoginResponse>("/v1/auth/login", body);

  return data.data;
};

export const logout = async () => {
  await api.post("/v1/auth/logout");
};
