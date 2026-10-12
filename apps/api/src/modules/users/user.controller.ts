import { Controller } from "@/types/handlers";

import * as userService from "./user.service";

export const getUsers: Controller = async (req, res, next) => {
  try {
    const users = await userService.getUsers(req.query);

    res.status(200).json({ success: true, data: { users } });
  } catch (error) {
    next(error);
  }
};

export const getUserById: Controller = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.userId as string);

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const registerUser: Controller = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);

    res.status(201).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const updateUser: Controller = async (req, res, next) => {
  try {
    const user = await userService.updateUser({
      userId: req.params.userId as string,
      payload: req.body,
    });

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: Controller = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.userId as string);

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};
