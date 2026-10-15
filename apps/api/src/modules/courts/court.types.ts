import { UpdateCourtBody } from "@courtdesk/shared";

// =======================================
// Service Params
// =======================================

export type UpdateCourtParams = {
  courtId: string;
  payload: UpdateCourtBody;
};
