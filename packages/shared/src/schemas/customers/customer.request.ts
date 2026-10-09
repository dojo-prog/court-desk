import { z } from "zod";
import {
  OptionalEmailSchema,
  OptionalPhPhoneSchema,
  PaginationQuerySchema,
  ReqFirstNameSchema,
  ReqLastNameSchema,
  SearchQuerySchema,
  UuidSchema,
} from "../common";

export const CustomerAllowableSortSchema = z.enum([
  "newest",
  "oldest",
  "mostReservations",
]);

// =======================================
// Params
// =======================================

export const CustomerIdParamsSchema = z.object({
  customerId: UuidSchema,
});

// =======================================
// Query
// =======================================

export const CustomerQuerySchema = z.object({
  ...PaginationQuerySchema.shape,
  search: SearchQuerySchema,
  sortBy: CustomerAllowableSortSchema,
});

// =======================================
// Body
// =======================================

export const CreateCustomerBodySchema = z.object({
  firstName: ReqFirstNameSchema,
  lastName: ReqLastNameSchema,
  email: OptionalEmailSchema,
  phone: OptionalPhPhoneSchema,
});

export const UpdateCustomerBodySchema = CreateCustomerBodySchema.extend({});

// =======================================
// Types
// =======================================

export type CustomerAllowableSort = z.infer<typeof CustomerAllowableSortSchema>;

export type CustomerQuery = z.infer<typeof CustomerQuerySchema>;

export type CreateCustomerBody = z.infer<typeof CreateCustomerBodySchema>;

export type UpdateCustomerBody = z.infer<typeof UpdateCustomerBodySchema>;
