import { pool } from "@/infrastructure/database/pool";
import { CUSTOMER_WITH_RELATIONS_PROJECTION } from "@/infrastructure/database/query/customer.query";
import { objectKeysToSnakeCase } from "@/utils/camelToSnakeCase";
import generateChanges from "@/utils/generateChanges";
import { buildInsertQueryParts } from "@/utils/query-builder/buildInsertQueryParts";
import { buildUpdateQueryParts } from "@/utils/query-builder/buildUpdateQueryParts";
import { buildCustomerFilterParts } from "@/utils/query-builder/filters/buildCustomerFilterParts";
import {
  CreateCustomerBody,
  CustomerEntity,
  CustomerQuery,
  CustomerWithRelations,
  UpdateCustomerBody,
} from "@courtdesk/shared";

export const find = async (
  query: CustomerQuery,
): Promise<{ customers: CustomerWithRelations[]; total: number }> => {
  const { whereClause, orderByClause, limitClause, offsetClause, values } =
    buildCustomerFilterParts({
      query,
      searchableColumns: ["c.first_name", "c.last_name", "c.email"],
    });

  const { rows } = await pool.query(
    `
    SELECT 
      ${CUSTOMER_WITH_RELATIONS_PROJECTION},
      COUNT(*) OVER()::INT AS total
    FROM customers c 
    ${whereClause}
    ${orderByClause}
    ${limitClause}
    ${offsetClause}
    `,
    values,
  );

  const customers = rows.map(({ total, ...c }) => c);

  return {
    customers,
    total: rows[0]?.total ?? 0,
  };
};

export const findWithRelationsById = async (
  customerId: string,
): Promise<CustomerWithRelations> => {
  const { rows } = await pool.query(
    `
    SELECT ${CUSTOMER_WITH_RELATIONS_PROJECTION}
    FROM customers c
    WHERE c.id = $1
    `,
    [customerId],
  );

  return rows[0];
};

export const findById = async (customerId: string): Promise<CustomerEntity> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM customers
    WHERE id = $1
    `,
    [customerId],
  );

  return rows[0];
};

export const findByName = async (
  firstName: string,
  lastName: string,
): Promise<CustomerEntity> => {
  const { rows } = await pool.query(
    `
    SELECT * FROM customers
    WHERE LOWER(first_name) = LOWER($1)
      AND LOWER(last_name) = LOWER($2)
    `,
    [firstName, lastName],
  );

  return rows[0];
};

export const add = async (
  payload: CreateCustomerBody,
): Promise<CustomerWithRelations> => {
  const data = objectKeysToSnakeCase(payload);

  const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(data);

  const { rows } = await pool.query(
    `
    INSERT INTO customers (${columnsStr})
    VALUES (${placeholdersStr})
    RETURNING *
    `,
    values,
  );

  const customerId = rows[0].id;

  return findWithRelationsById(customerId);
};

export const update = async (
  customer: CustomerEntity,
  payload: UpdateCustomerBody,
): Promise<CustomerWithRelations> => {
  const changes = generateChanges(customer, objectKeysToSnakeCase(payload));

  const { setClause, values } = buildUpdateQueryParts(changes);
  values.push(customer.id);

  await pool.query(
    `
    UPDATE customers
    ${setClause}
    WHERE id = $${values.length}
    `,
    values,
  );

  return findWithRelationsById(customer.id);
};

export const remove = async (customerId: string): Promise<CustomerEntity> => {
  const { rows } = await pool.query(
    `
    DELETE FROM customers
    WHERE id = $1
    RETURNING *
    `,
    [customerId],
  );

  return rows[0];
};

export const count = async (): Promise<number> => {
  const { rows } = await pool.query(
    `
    SELECT COUNT(*) FROM customers
    `,
  );

  return rows[0].count;
};
