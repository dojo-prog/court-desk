import { protectRoute } from "@/middlewares/auth.middleware";
import express from "express";

import * as authController from "./auth.controller";
import { loginRateLimiter } from "./auth.rate-limit";

const router = express.Router();

router.get("/me", protectRoute, authController.getCurrentUser);
router.post("/login", loginRateLimiter, authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-access", authController.refreshAccessToken);

export default router;
