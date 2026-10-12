import {
  UserPrivateEntitySchema,
  UserPublicEntitySchema,
} from "@courtdesk/shared";

const USER_PUBLIC_COLUMNS = Object.keys(UserPublicEntitySchema.shape);

const USER_PRIVATE_COLUMNS = Object.keys(UserPrivateEntitySchema.shape);

export const USER_PUBLIC_PROJECTION = USER_PUBLIC_COLUMNS.join(", ");

export const USER_PRIVATE_PROJECTION = USER_PRIVATE_COLUMNS.join(", ");
