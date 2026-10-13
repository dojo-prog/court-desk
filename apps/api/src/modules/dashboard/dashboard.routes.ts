import express from "express";
import { authorizeRoles, protectRoute } from "@/middlewares/auth.middleware";

import * as dashboardController from "./dashboard.controller";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router.get("/overview", dashboardController.getOverview);

export default router;
