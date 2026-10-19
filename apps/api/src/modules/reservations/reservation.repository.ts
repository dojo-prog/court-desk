import { pool } from "@/infrastructure/database/pool";
import { CreateReservationFinalPayload } from "./reservation.types";
import generateChanges from "@/utils/generateChanges";
import { buildUpdateQueryParts } from "@/utils/query-builder/buildUpdateQueryParts";
import { objectKeysToSnakeCase } from "@/utils/camelToSnakeCase";
import { buildInsertQueryParts } from "@/utils/query-builder/buildInsertQueryParts";
import { buildReservationFilterParts } from "@/utils/query-builder/filters/buildReservationFilterParts";
import {
  RESERVATION_JOINS,
  RESERVATION_WITH_RELATIONS_PROJECTION,
} from "@/infrastructure/database/query/reservation.query";
import {
  ReservationAvailabilityQuery,
  ReservationEntity,
  ReservationQuery,
  ReservationWithRelations,
} from "@courtdesk/shared";

export const find = async (
  query: ReservationQuery,
): Promise<{ reservations: ReservationWithRelations[]; total: number }> => {
  const { whereClause, orderByClause, limitClause, offsetClause, values } =
    buildReservationFilterParts({
      query,
      searchableColumns: ["c.first_name", "c.last_name", "c.email"],
    });

  const { rows } = await pool.query(
    `
    SELECT ${RESERVATION_WITH_RELATIONS_PROJECTION},
      COUNT(*) OVER()::INT AS total 
    FROM reservations r
    ${RESERVATION_JOINS}
    ${whereClause}
    ${orderByClause}
    ${limitClause}
    ${offsetClause}
    `,
    values,
  );

  const reservations = rows.map(({ total, ...r }) => r);

  return {
    reservations,
    total: rows[0]?.total ?? 0,
  };
};

export const findWithRelationsById = async (
  reservationId: string,
): Promise<ReservationWithRelations> => {
  const { rows } = await pool.query(
    `
    SELECT ${RESERVATION_WITH_RELATIONS_PROJECTION}
    FROM reservations r
    ${RESERVATION_JOINS}
    WHERE r.id = $1
    `,
    [reservationId],
  );

  return rows[0];
};

export const findById = async (
  reservationId: string,
): Promise<ReservationEntity> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM reservations
    WHERE id = $1
    `,
    [reservationId],
  );

  return rows[0];
};

export const checkAvailability = async (
  query: ReservationAvailabilityQuery,
): Promise<ReservationWithRelations> => {
  const { courtId, date, startTime, endTime } = query;

  const { rows } = await pool.query(
    `
    SELECT ${RESERVATION_WITH_RELATIONS_PROJECTION}
    FROM reservations r
    ${RESERVATION_JOINS}
    WHERE r.court_id = $1
      AND r.date = $2
      AND r.start_time < $4
      AND r.end_time > $3
    LIMIT 1
    `,
    [courtId, date, startTime, endTime],
  );

  return rows[0];
};

export const add = async (
  payload: CreateReservationFinalPayload,
): Promise<ReservationWithRelations> => {
  const data = objectKeysToSnakeCase(payload);

  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(data);

  const { rows } = await pool.query(
    `
    INSERT INTO reservations (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING id
    `,
    values,
  );

  const reservationId = rows[0].id;

  return findWithRelationsById(reservationId);
};

export const update = async (
  reservation: ReservationEntity,
  payload: Partial<ReservationEntity>,
): Promise<ReservationWithRelations> => {
  const changes = generateChanges(reservation, objectKeysToSnakeCase(payload));

  const { setClause, values } = buildUpdateQueryParts(changes);
  values.push(reservation.id);

  await pool.query(
    `
    UPDATE reservations
    ${setClause}
    WHERE id = $${values.length}
    `,
    values,
  );

  return findWithRelationsById(reservation.id);
};

export const remove = async (
  reservationId: string,
): Promise<ReservationEntity> => {
  const { rows } = await pool.query(
    `
    DELETE FROM reservations 
    WHERE id = $1
    RETURNING *
    `,
    [reservationId],
  );

  return rows[0];
};

export const count = async (): Promise<number> => {
  const { rows } = await pool.query(
    `
    SELECT COUNT(*) FROM reservations 
    `,
  );

  return rows[0].count;
};
