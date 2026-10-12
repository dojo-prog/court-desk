import { rateLimit } from "express-rate-limit";

export const registerUserRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many consecutive user registeration. Please try again later.",
  },
});

export const updateUserRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many consecutive user updates. Please try again later.",
  },
});
