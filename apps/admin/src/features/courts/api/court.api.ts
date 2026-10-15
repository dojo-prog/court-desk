import { api } from "@/lib/axios/client";
import type {
  CourtQuery,
  CreateCourtBody,
  UpdateCourtBody,
} from "@courtdesk/shared";
import type {
  CreateCourtRes,
  DeleteCourtRes,
  FetchCourtRes,
  FetchCourtsRes,
  UpdateCourtRes,
} from "../types/court.types";

export const fetchCourts = async (params: CourtQuery) => {
  const { data } = await api.get<FetchCourtsRes>(`/v1/courts`, { params });

  return data.data;
};

export const fetchCourt = async (courtId: string) => {
  const { data } = await api.get<FetchCourtRes>(`/v1/courts/${courtId}`);

  return data.data;
};

export const createCourt = async (body: CreateCourtBody) => {
  const { data } = await api.post<CreateCourtRes>(`/v1/courts`, body);

  return data.data;
};

export const updateCourt = async (courtId: string, body: UpdateCourtBody) => {
  const { data } = await api.patch<UpdateCourtRes>(
    `/v1/courts/${courtId}`,
    body,
  );

  return data.data;
};

export const deleteCourt = async (courtId: string) => {
  const { data } = await api.delete<DeleteCourtRes>(`/v1/courts/${courtId}`);

  return data.data;
};
