import { Controller } from "@/types/handlers";

import * as paymentService from "./payment.service";
import { PaymentQuerySchema } from "@courtdesk/shared";

export const getPayments: Controller = async (req, res, next) => {
  try {
    const data = await paymentService.getPayments(
      PaymentQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getPaymentById: Controller = async (req, res, next) => {
  try {
    const payment = await paymentService.getPaymentById(
      req.params.paymentId as string,
    );

    res.status(200).json({ success: true, data: { payment } });
  } catch (error) {
    next(error);
  }
};

export const createPayment: Controller = async (req, res, next) => {
  try {
    const payment = await paymentService.createPayment({
      ...req.body,
      recordedBy: req.user!.id,
    });

    res.status(201).json({ success: true, data: { payment } });
  } catch (error) {
    next(error);
  }
};
