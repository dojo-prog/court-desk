import { rateLimit } from "express-rate-limit";

const baseReservationWriteLimitConfig = {
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
};

export const createReservationLimiter = rateLimit({
  ...baseReservationWriteLimitConfig,
  message: {
    success: false,
    message: "Too many reservation attempts. Please try again in a moment.",
  },
});

export const updateReservationLimiter = rateLimit({
  ...baseReservationWriteLimitConfig,
  message: {
    success: false,
    message:
      "Too many reservation update attempts. Please try again in a moment.",
  },
});
