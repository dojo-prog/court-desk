import * as healthRepository from "./health.repository";
import { ReadinessResult } from "./health.types";

export const checkReadiness = async (): Promise<ReadinessResult> => {
  const database = await healthRepository.database();

  if (!database) {
    return {
      status: "not_ready",
      checks: {
        database: "down",
      },
    };
  }

  return {
    status: "ready",
    checks: {
      database: "up",
    },
  };
};
