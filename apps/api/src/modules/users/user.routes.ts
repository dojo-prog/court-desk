import { authorizeRoles, protectRoute } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validation.middleware";
import {
  RegisterUserBodySchema,
  UpdateUserBodySchema,
  UserIdParamsSchema,
  UserQuerySchema,
} from "@courtdesk/shared";
import express from "express";
import {
  registerUserRateLimiter,
  updateUserRateLimiter,
} from "./user.rate-limit";

import * as userController from "./user.controller";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router
  .route("/")
  .get(validate({ query: UserQuerySchema }), userController.getUsers)
  .post(
    registerUserRateLimiter,
    validate({ body: RegisterUserBodySchema }),
    userController.registerUser,
  );

router
  .route("/:userId")
  .get(validate({ params: UserIdParamsSchema }), userController.getUserById)
  .patch(
    updateUserRateLimiter,
    validate({ params: UserIdParamsSchema, body: UpdateUserBodySchema }),
    userController.updateUser,
  )
  .delete(validate({ params: UserIdParamsSchema }), userController.deleteUser);

// TODO Add archive endpoint

export default router;
