import { ReservationQuery, ReservationSorts } from "@courtdesk/shared";

interface Result {
  whereClause: string;
  orderByClause: string;
  limitClause: string;
  offsetClause: string;
  values: unknown[];
}

interface Params {
  query: ReservationQuery;
  baseConditions?: string[];
  baseValues?: string[];
  searchableColumns?: string[];
}

export const buildReservationFilterParts = ({
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

  const { page, limit, status, date, search, sortBy } = query;

  // =======================================
  // WHERE CLAUSE CONSTRUCTION
  // =======================================

  if (search && searchableColumns?.length) {
    const placeholder = `$${values.length + 1}`;

    const searchConditions = searchableColumns
      .map((sc) => `${sc} ILIKE ${placeholder}`)
      .join(" OR ");

    conditions.push(`(${searchConditions})`);
    values.push(`%${search}%`);
  }

  if (status) {
    values.push(status);
    conditions.push(`r.status = $${values.length}`);
  }

  if (date) {
    values.push(date);
    conditions.push(`r.date = $${values.length}`);
  }

  if (conditions.length > 0) {
    clauses.whereClause = `WHERE ${conditions.join(" AND ")}`;
  }

  // =======================================
  // ORDER BY CLAUSE CONSTRUCTION
  // =======================================

  const sortMap: Record<ReservationSorts, string> = {
    newest: "r.created_at DESC",
    oldest: "r.created_at ASC",
    startTimeAsc: "r.start_time ASC",
    startTimeDesc: "r.start_time DESC",
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
