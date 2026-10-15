import { Controller } from "@/types/handlers";

import * as courtService from "./court.service";
import { CourtQuerySchema } from "@courtdesk/shared";

export const getCourts: Controller = async (req, res, next) => {
  try {
    const courts = await courtService.getCourts(
      CourtQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data: { courts } });
  } catch (error) {
    next(error);
  }
};

export const getCourtById: Controller = async (req, res, next) => {
  try {
    const court = await courtService.getCourtById(req.params.courtId as string);

    res.status(200).json({ success: true, data: { court } });
  } catch (error) {
    next(error);
  }
};

export const createCourt: Controller = async (req, res, next) => {
  try {
    const court = await courtService.createCourt(req.body);

    res.status(201).json({ success: true, data: { court } });
  } catch (error) {
    next(error);
  }
};

export const updateCourt: Controller = async (req, res, next) => {
  try {
    const court = await courtService.updateCourt({
      courtId: req.params.courtId as string,
      payload: req.body,
    });

    res.status(200).json({ success: true, data: { court } });
  } catch (error) {
    next(error);
  }
};

export const deleteCourt: Controller = async (req, res, next) => {
  try {
    const court = await courtService.deleteCourt(req.params.courtId as string);

    res.status(200).json({ success: true, data: { court } });
  } catch (error) {
    next(error);
  }
};
