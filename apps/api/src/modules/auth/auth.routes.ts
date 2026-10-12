import express from "express";
import { protectRoute } from "@/middlewares/auth.middleware";
import { loginRateLimiter } from "./auth.rate-limit";
import { validate } from "@/middlewares/validation.middleware";
import { LoginBodySchema } from "@courtdesk/shared";

import * as authController from "./auth.controller";

const router = express.Router();

router.get("/me", protectRoute, authController.getCurrentUser);

router.post(
  "/login",
  loginRateLimiter,
  validate({ body: LoginBodySchema }),
  authController.login,
);

router.post("/logout", authController.logout);

router.post("/refresh-access", authController.refreshAccessToken);

export default router;
