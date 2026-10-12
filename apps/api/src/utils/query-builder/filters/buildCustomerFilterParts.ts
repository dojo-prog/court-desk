import { CustomerQuery } from "@courtdesk/shared";

interface Result {
  whereClause: string;
  orderByClause: string;
  limitClause: string;
  offsetClause: string;
  values: unknown[];
}

interface Params {
  query: CustomerQuery;
  baseConditions?: string[];
  baseValues?: string[];
  searchableColumns?: string[];
}

export const buildCustomerFilterParts = ({
  query,
  baseConditions = [],
  baseValues = [],
  searchableColumns,
}: Params): Result => {
  const conditions: string[] = baseConditions;
  const values: unknown[] = baseValues;

  const clauses = {
    whereClause: "",
    orderByClause: "ORDER BY created_at IS NULL, created_at DESC",
    limitClause: "",
    offsetClause: "",
  };

  const { page, limit, sortBy, search } = query;

  // =======================================
  // WHERE CLAUSE CONSTRUCTION
  // =======================================

  if (search && searchableColumns?.length) {
    const placeholder = `$${values.length}`;

    const searchConditions = searchableColumns
      .map((sc) => `${sc} ILIKE ${placeholder}`)
      .join(" OR ");

    conditions.push(`(${searchConditions})`);
    values.push(`%${search}%`);
  }

  if (conditions.length > 0) {
    clauses.whereClause = `WHERE ${conditions.join(" AND ")}`;
  }

  // =======================================
  // ORDER BY CLAUSE CONSTRUCTION
  // =======================================

  const sortMap: Record<string, string> = {
    newest: "c.created_at DESC",
    oldest: "c.created_at ASC",
    mostReservations: "reservations_count DESC",
  };

  if (sortBy && sortMap[sortBy]) {
    clauses.orderByClause = `ORDER BY ${sortMap[sortBy]}`;
  }

  // =======================================
  // LIMIT & OFFSET CLAUSE
  // =======================================

  if (page && limit && !Number.isNaN(page) && !Number.isNaN(limit)) {
    clauses.limitClause = `LIMIT ${limit}`;
    clauses.offsetClause = `OFFSET ${(page - 1) * limit}`;
  }

  return {
    ...clauses,
    values,
  };
};
