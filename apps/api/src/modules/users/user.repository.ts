import { pool } from "@/infrastructure/database/pool";
import { USER_PUBLIC_PROJECTION } from "@/infrastructure/database/query/user.query";
import { objectKeysToSnakeCase } from "@/utils/camelToSnakeCase";
import { RegisterUserFinalPayload } from "./user.types";
import { buildInsertQueryParts } from "@/utils/query-builder/buildInsertQueryParts";
import { buildUpdateQueryParts } from "@/utils/query-builder/buildUpdateQueryParts";
import {
  UpdateUserBody,
  UserPrivateEntity,
  UserPublicEntity,
  UserQuery,
} from "@courtdesk/shared";
import generateChanges from "@/utils/generateChanges";

export const find = async (query: UserQuery): Promise<UserPublicEntity[]> => {
  const { search } = query;

  const { rows } = await pool.query(
    `
    SELECT ${USER_PUBLIC_PROJECTION}
    FROM users 
    WHERE (
      first_name ILIKE $1
        OR last_name ILIKE $1
        OR email ILIKE $1
    )
    `,
    [`%${search}%`],
  );

  return rows;
};

export const findById = async (userId: string): Promise<UserPublicEntity> => {
  const { rows } = await pool.query(
    `
    SELECT ${USER_PUBLIC_PROJECTION}
    FROM users
    WHERE id = $1
    `,
    [userId],
  );

  return rows[0];
};

export const findByName = async (
  firstName: string,
  lastName: string,
): Promise<UserPublicEntity> => {
  const { rows } = await pool.query(
    `
    SELECT ${USER_PUBLIC_PROJECTION}
    FROM users
    WHERE LOWER(first_name) = LOWER($1)
      AND LOWER(last_name) = LOWER($1)
    `,
    [firstName, lastName],
  );

  return rows[0];
};

export const findByEmail = async (email: string): Promise<UserPublicEntity> => {
  const { rows } = await pool.query(
    `
    SELECT ${USER_PUBLIC_PROJECTION}
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  return rows[0];
};

export const register = async (
  payload: RegisterUserFinalPayload,
): Promise<UserPublicEntity> => {
  const data = objectKeysToSnakeCase(payload);

  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(data);

  const { rows } = await pool.query(
    `
    INSERT INTO users (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING *
    `,
    values,
  );

  const userPrivate: UserPrivateEntity = rows[0];
  const { password_hash, ...userPublic } = userPrivate;

  return userPublic;
};

export const update = async (
  original: UserPublicEntity,
  payload: UpdateUserBody,
): Promise<UserPublicEntity> => {
  const changes = generateChanges(original, objectKeysToSnakeCase(payload));

  const { setClause, values } = buildUpdateQueryParts(changes);
  values.push(original.id);

  const { rows } = await pool.query(
    `
    UPDATE users 
    ${setClause}
    WHERE id = $${values.length}
    RETURNING *
    `,
  );

  const userPrivate: UserPrivateEntity = rows[0];
  const { password_hash, ...userPublic } = userPrivate;

  return userPublic;
};

export const remove = async (userId: string): Promise<UserPublicEntity> => {
  const { rows } = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
    `,
    [userId],
  );

  const userPrivate: UserPrivateEntity = rows[0];
  const { password_hash, ...userPublic } = userPrivate;

  return userPublic;
};
