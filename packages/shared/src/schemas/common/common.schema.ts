import { z } from "zod";

export const UuidSchema = z.string().uuid({ message: "Invalid uuid format" });

export const ReqFirstNameSchema = z
  .string()
  .trim()
  .min(1, { message: "First name is required" })
  .max(100, { message: "First name cannot exceed 100 characters" });

export const ReqLastNameSchema = z
  .string()
  .trim()

  .min(1, { message: "Last name is required" })
  .max(100, { message: "Last name cannot exceed 100 characters" });

export const ReqEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { message: "Email is required" })
  .max(200, { message: "Email cannot exceed 200 characters" })
  .email({ message: "Invalid email format" });

export const OptionalEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(200, { message: "Email cannot exceed 200 characters" })
  .email({ message: "Invalid email format" })
  .optional();

export const IsoDateTimeSchema = z.iso.datetime({
  offset: true,
  message: "Invalid iso datetime format",
});

export const IsoDateSchema = z.iso.date({
  message: "Invalid iso date format",
});

export const IsoTimeSchema = z.iso.date({
  message: "Invalid iso time format",
});

export const ReqIsoDateTimeSchema = z.iso
  .datetime({
    offset: true,
    message: "Invalid iso datetime format",
  })
  .min(1, { message: "Datetime is required" });

export const ReqIsoDateSchema = z.iso
  .date({
    message: "Invalid iso date format",
  })
  .min(1, { message: "Date is required" });

export const ReqIsoTimeSchema = z.iso
  .date({
    message: "Invalid iso time format",
  })
  .min(1, { message: "Time is required" });

export const ReqPhPhoneSchema = z
  .string()
  .min(1, { message: "Phone number is required" })
  .regex(/^09\d{9}$/, {
    message:
      "Phone number must be a valid PH mobile number (e.g., 09171234567)",
  });

export const OptionalPhPhoneSchema = z
  .string()
  .regex(/^09\d{9}$/, {
    message:
      "Phone number must be a valid PH mobile number (e.g., 09171234567)",
  })
  .optional();

export const MoneySchema = z
  .number()
  .finite("Amount must be a finite number")
  .nonnegative("Amount cannot be negative")
  .refine(
    (value) => Number.isInteger(value * 100),
    "Amount can have at most 2 decimal places",
  );

export const NotesSchema = z
  .string()
  .trim()
  .max(1000, { message: "Notes cannot exceed 1000 characters" });

export const NonNegativeIntSchema = z.coerce
  .number()
  .int({ message: "Number must be a whole number" })
  .nonnegative({ message: "Number must not be less than 0" });

// =======================================
// Query
// =======================================

export const SearchQuerySchema = z.string().trim().optional();

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().nonnegative().default(1),
  limit: z.coerce.number().int().nonnegative().default(10),
});
