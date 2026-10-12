import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware";
import { globalRateLimiter } from "./infrastructure/rate-limit/global-rate-limiter";

import healthRouter from "@/modules/health/health.routes";
import authRouter from "@/modules/auth/auth.routes";

const app = express();

// Cors Config
const allowedOrigin = [ENV.CLIENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Parsers
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Global Rate Limiter
app.use(globalRateLimiter);

// Health Route
app.use("/health", healthRouter);

// Routers
app.use("/api/v1/auth", authRouter);

// Error Handler
app.use(errorMiddleware);

export { app };
