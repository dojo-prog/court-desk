import { rateLimit } from "express-rate-limit";

export const createPaymentLimiter = rateLimit({
  windowMs: 6 * 1000,
  limit: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many payment attempts. Please try again in a moment.",
  },
});
