import { CourtEntity, CourtQuery, CreateCourtBody } from "@courtdesk/shared";

import * as courtRepository from "./court.repository";
import { AppError } from "@/utils/errors/AppError";
import { UpdateCourtParams } from "./court.types";

export const getCourts = async (query: CourtQuery): Promise<CourtEntity[]> => {
  return courtRepository.find(query);
};

export const getCourtById = async (courtId: string): Promise<CourtEntity> => {
  const court = await courtRepository.findById(courtId);

  if (!court) {
    throw new AppError(404, "Court not found");
  }

  return court;
};

export const createCourt = async (
  payload: CreateCourtBody,
): Promise<CourtEntity> => {
  return courtRepository.add(payload);
};

export const updateCourt = async (
  params: UpdateCourtParams,
): Promise<CourtEntity> => {
  const { courtId, payload } = params;

  const court = await courtRepository.findById(courtId);

  if (!court) {
    throw new AppError(404, "Court not found");
  }

  return courtRepository.update(court, payload);
};

export const deleteCourt = async (courtId: string): Promise<CourtEntity> => {
  const court = await courtRepository.remove(courtId);

  if (!court) {
    throw new AppError(404, "Court not found");
  }

  return court;
};
