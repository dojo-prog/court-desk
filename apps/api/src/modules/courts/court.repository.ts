import { pool } from "@/infrastructure/database/pool";
import { objectKeysToSnakeCase } from "@/utils/camelToSnakeCase";
import generateChanges from "@/utils/generateChanges";
import { buildInsertQueryParts } from "@/utils/query-builder/buildInsertQueryParts";
import { buildUpdateQueryParts } from "@/utils/query-builder/buildUpdateQueryParts";
import {
  CourtEntity,
  CourtQuery,
  CreateCourtBody,
  UpdateCourtBody,
} from "@courtdesk/shared";

export const find = async (query: CourtQuery): Promise<CourtEntity[]> => {
  const { search } = query;

  const { rows } = await pool.query(
    `
    SELECT * FROM courts
    WHERE name ILIKE $1
    ORDER BY created_at IS NULL, created_at DESC
    `,
    [`%${search}%`],
  );

  return rows;
};

export const findById = async (courtId: string): Promise<CourtEntity> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM courts
    WHERE id = $1
    `,
    [courtId],
  );

  return rows[0];
};

export const add = async (payload: CreateCourtBody): Promise<CourtEntity> => {
  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(
    objectKeysToSnakeCase(payload),
  );

  const { rows } = await pool.query(
    `
    INSERT INTO courts (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING *
    `,
    values,
  );

  return rows[0];
};

export const update = async (
  court: CourtEntity,
  payload: UpdateCourtBody,
): Promise<CourtEntity> => {
  const changes = generateChanges(court, objectKeysToSnakeCase(payload));

  const { setClause, values } = buildUpdateQueryParts(changes);
  values.push(court.id);

  const { rows } = await pool.query(
    `
    UPDATE courts
    ${setClause}
    WHERE id = $${values.length}
    RETURNING *
    `,
    values,
  );

  return rows[0];
};

export const remove = async (courtId: string): Promise<CourtEntity> => {
  const { rows } = await pool.query(
    `
    DELETE FROM courts
    WHERE id = $1
    `,
    [courtId],
  );

  return rows[0];
};
