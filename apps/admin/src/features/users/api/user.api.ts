import { api } from "@/lib/axios/client";
import type {
  RegisterUserBody,
  UpdateUserBody,
  UserQuery,
} from "@courtdesk/shared";
import type {
  DeleteUsersRes,
  FetchUserRes,
  FetchUsersRes,
  RegisterUsersRes,
  UpdateUserRes,
} from "../types/user.types";

// =======================================
// Query
// =======================================

export const fetchUsers = async (params: UserQuery) => {
  const { data } = await api.get<FetchUsersRes>("/v1/users", { params });

  return data.data;
};

export const fetchUser = async (userId: string) => {
  const { data } = await api.get<FetchUserRes>(`/v1/users/${userId}`);

  return data.data;
};

// =======================================
// Mutation
// =======================================

export const registerUser = async (body: RegisterUserBody) => {
  const { data } = await api.post<RegisterUsersRes>(`/v1/users`, body);

  return data.data;
};

export const updateUser = async (userId: string, body: UpdateUserBody) => {
  const { data } = await api.patch<UpdateUserRes>(`/v1/users/${userId}`, body);

  return data.data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await api.delete<DeleteUsersRes>(`/v1/users/${userId}`);

  return data.data;
};
