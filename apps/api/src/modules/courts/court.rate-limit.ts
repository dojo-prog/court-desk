import { rateLimit } from "express-rate-limit";

const baseWriteLimitConfig = {
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many write attempts. Please try again in a moment.",
  },
};

export const createCourtLimiter = rateLimit({
  ...baseWriteLimitConfig,
  message: {
    success: false,
    message:
      "Too many consecutive court creation attempts. Please try again in a moment.",
  },
});

export const updateCourtLimiter = rateLimit({
  ...baseWriteLimitConfig,
  message: {
    success: false,
    message:
      "Too many consecutive court update attempts. Please try again in a moment.",
  },
});

export const deleteCourtLimiter = rateLimit({
  ...baseWriteLimitConfig,
  message: {
    success: false,
    message:
      "Too many consecutive court deletion attempts. Please try again in a moment.",
  },
});
