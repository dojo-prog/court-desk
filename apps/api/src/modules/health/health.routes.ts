import express from "express";

import * as healthController from "./health.controller";

const router = express.Router();

router.get("/live", healthController.live);
router.get("/ready", healthController.ready);

export default router;
