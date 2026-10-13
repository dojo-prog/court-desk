import { Controller } from "@/types/handlers";

import * as dashboardService from "./dashboard.service";

export const getOverview: Controller = async (req, res, next) => {
  try {
    const data = await dashboardService.getOverview();

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
