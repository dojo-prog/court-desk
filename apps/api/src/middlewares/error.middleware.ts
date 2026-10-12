import { ENV } from "@/config/env";
import { PostgresError } from "@/types/error.types";
import { AppError } from "@/utils/errors/AppError";
import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const isProduction = ENV.NODE_ENV === "production";

  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: Record<string, unknown> | null = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else {
    const pgError = err as PostgresError;

    // Uniqueness Error
    if (pgError.code === "23505") {
      statusCode = 409;

      switch (pgError.constraint) {
        case "user_name_unique":
          message = "A user with this name already exists";
          break;

        case "user_email_unique":
          message = "A user with this email already exists";
          break;

        case "customer_name_unique":
          message = "A customer with this name already exists";
          break;

        case "court_name_unique":
          message = "A court with this name already exists";
          break;

        default:
          message = "Resource already used";
          break;
      }

      // Validation Error
    } else if (pgError.code === "23514") {
      statusCode = 400;

      switch (pgError.constraint) {
        case "court_status_valid":
          message = "Invalid court status";
          break;

        case "reservation_status_valid":
          message = "Invalid reservation status";
          break;

        case "reservation_time_valid":
          message = "Start time should be before the end time";
          break;

        case "payment_method_valid":
          message = "Invalid / unregistered payment method";
          break;
      }

      // Exclusion Violation
    } else if (pgError.code === "23P01") {
      statusCode = 409;

      switch (pgError.constraint) {
        case "reservation_no_overlap":
          message = "This court is already reserved for the selected time slot";
          break;
      }

      // Internal Server Error
    } else if (!isProduction && err instanceof Error) {
      message = err.message;
    }
  }

  if ((statusCode >= 500 && isProduction) || !isProduction) {
    console.error(err);
  }

  const response: Record<string, unknown> = {
    success: false,
    message,
  };

  if (errors) {
    response.errrors = errors;
  }

  if (!isProduction) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
