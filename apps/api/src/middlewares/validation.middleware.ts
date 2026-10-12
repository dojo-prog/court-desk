import { Middleware } from "@/types/handlers";
import { AppError } from "@/utils/errors/AppError";
import { ZodTypeAny } from "zod";

interface ValidationSchemas {
  params?: ZodTypeAny;
  query?: ZodTypeAny;
  body?: ZodTypeAny;
}

// =======================================
// Schema Validator
// =======================================

const validateSchema = (schema: ZodTypeAny, value: Record<string, unknown>) => {
  const result = schema.safeParse(value);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    const firstError = result.error.issues[0];

    throw new AppError(400, firstError.message, fieldErrors);
  }

  return result.data;
};

// =======================================
// Validation Middleware
// =======================================

export const validate = (schemas: ValidationSchemas): Middleware => {
  return (req, res, next) => {
    if (schemas.params) {
      req.params = validateSchema(
        schemas.params,
        req.params,
      ) as typeof req.params;
    }

    if (schemas.query) {
      Object.assign(req.query, validateSchema(schemas.query, req.query));
    }

    if (schemas.body) {
      req.body = validateSchema(schemas.body, req.body);
    }

    next();
  };
};
