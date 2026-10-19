import { pool } from "@/infrastructure/database/pool";
import {
  PAYMENT_JOINS,
  PAYMENT_WITH_RELATIONS_PROJECTION,
} from "@/infrastructure/database/query/payment.query";
import { buildPaymentFilterParts } from "@/utils/query-builder/filters/buildPaymentFilterParts";
import {
  PaymentEntity,
  PaymentQuery,
  PaymentWithRelations,
} from "@courtdesk/shared";
import { CreatePaymentFinalPayload } from "./payment.types";
import { objectKeysToSnakeCase } from "@/utils/camelToSnakeCase";
import { buildInsertQueryParts } from "@/utils/query-builder/buildInsertQueryParts";

export const find = async (
  query: PaymentQuery,
): Promise<{ payments: PaymentWithRelations[]; total: number }> => {
  const { whereClause, orderByClause, offsetClause, limitClause, values } =
    buildPaymentFilterParts({
      query,
      searchableColumns: ["c.first_name", "c.last_name"],
    });

  const { rows } = await pool.query(
    `
    SELECT ${PAYMENT_WITH_RELATIONS_PROJECTION},
      COUNT(*) OVER()::INT AS total
    FROM payments p
    ${PAYMENT_JOINS}
    ${whereClause}
    ${orderByClause}
    ${offsetClause}
    ${limitClause}
    `,
    values,
  );

  const payments = rows.map(({ total, ...p }) => p);

  return {
    payments,
    total: rows[0]?.total ?? 0,
  };
};

export const findWithRelationsById = async (
  paymentId: string,
): Promise<PaymentWithRelations> => {
  const { rows } = await pool.query(
    `
    SELECT ${PAYMENT_WITH_RELATIONS_PROJECTION}
    FROM payments p
    ${PAYMENT_JOINS}
    WHERE p.id = $1
    `,
    [paymentId],
  );

  return rows[0];
};

export const findById = async (paymentId: string): Promise<PaymentEntity> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM payments
    WHERE id = $1
    `,
    [paymentId],
  );

  return rows[0];
};

export const add = async (
  payload: CreatePaymentFinalPayload,
): Promise<PaymentWithRelations> => {
  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(
    objectKeysToSnakeCase(payload),
  );

  const { rows } = await pool.query(
    `
    INSERT INTO payments (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING id
    `,
    values,
  );

  const paymentId = rows[0].id;

  return findWithRelationsById(paymentId);
};

export const countRevenue = async (): Promise<number> => {
  const { rows } = await pool.query(
    `
    SELECT SUM(amount) AS revenue 
    FROM payments 
    `,
  );

  return rows[0].revenue;
};
