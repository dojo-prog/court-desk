import { pool } from "@/infrastructure/database/pool";
import {
  USER_PRIVATE_PROJECTION,
  USER_PUBLIC_PROJECTION,
} from "@/infrastructure/database/query/user.query";
import { UserPrivateEntity, UserPublicEntity } from "@courtdesk/shared";

export const findPrivateById = async (
  userId: string,
): Promise<UserPrivateEntity> => {
  const { rows } = await pool.query(
    `
    SELECT ${USER_PRIVATE_PROJECTION}
    FROM users
    WHERE id = $1
    `,
    [userId],
  );

  return rows[0];
};

export const findPrivateByEmail = async (
  email: string,
): Promise<UserPrivateEntity> => {
  const { rows } = await pool.query(
    `
    SELECT ${USER_PRIVATE_PROJECTION}
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  return rows[0];
};

export const findPublicById = async (
  userId: string,
): Promise<UserPublicEntity> => {
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

export const findPublicByEmail = async (
  email: string,
): Promise<UserPublicEntity> => {
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
