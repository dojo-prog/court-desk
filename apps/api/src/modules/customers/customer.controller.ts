import { Controller } from "@/types/handlers";
import { CustomerQuerySchema } from "@courtdesk/shared";

import * as customerService from "./customer.service";

export const getCustomers: Controller = async (req, res, next) => {
  try {
    const data = await customerService.getCustomers(
      CustomerQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getCustomerById: Controller = async (req, res, next) => {
  try {
    const customer = await customerService.getCustomerById(
      req.params.customerId as string,
    );

    res.status(200).json({ success: true, data: { customer } });
  } catch (error) {
    next(error);
  }
};

export const createCustomer: Controller = async (req, res, next) => {
  try {
    const customer = await customerService.createCustomer(req.body);

    res.status(201).json({ success: true, data: { customer } });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer: Controller = async (req, res, next) => {
  try {
    const customer = await customerService.updateCustomer({
      customerId: req.params.customerId as string,
      payload: req.body,
    });

    res.status(200).json({ success: true, data: { customer } });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer: Controller = async (req, res, next) => {
  try {
    const customer = await customerService.deleteCustomer(
      req.params.customerId as string,
    );

    res.status(200).json({ success: true, data: { customer } });
  } catch (error) {
    next(error);
  }
};
