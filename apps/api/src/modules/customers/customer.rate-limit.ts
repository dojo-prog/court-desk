import { rateLimit } from "express-rate-limit";

const baseWriteLimitConfig = {
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
};

export const createCustomerLimiter = rateLimit({
  ...baseWriteLimitConfig,
  message: {
    success: false,
    message:
      "Too many consecutive add customer attempts. Please try again later.",
  },
});

export const updateCustomerLimiter = rateLimit({
  ...baseWriteLimitConfig,
  message: {
    success: false,
    message:
      "Too many consecutive update customer details attempts. Please try again later.",
  },
});

export const deleteCustomerLimiter = rateLimit({
  ...baseWriteLimitConfig,
  limit: 15,
  message: {
    success: false,
    message:
      "Too many consecutive customer removal attempts. Please try again later.",
  },
});
