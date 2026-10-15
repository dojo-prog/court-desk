import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware";
import { globalRateLimiter } from "./infrastructure/rate-limit/global-rate-limiter";

import healthRouter from "@/modules/health/health.routes";
import authRouter from "@/modules/auth/auth.routes";
import userRouter from "@/modules/users/user.routes";
import customerRouter from "@/modules/customers/customer.routes";
import courtRouter from "@/modules/courts/court.routes";
import reservationRouter from "@/modules/reservations/reservation.routes";
import paymentRouter from "@/modules/payments/payment.routes";
import dashboardRouter from "@/modules/dashboard/dashboard.routes";

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
app.use("/api/v1/users", userRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/courts", courtRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/dashboard", dashboardRouter);

// Error Handler
app.use(errorMiddleware);

export { app };
