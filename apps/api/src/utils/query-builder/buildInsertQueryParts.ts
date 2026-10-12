interface Result {
  columnsStr: string;
  placeholdersStr: string;
  values: unknown[];
}

export const buildInsertQueryParts = <T extends object>(data: T): Result => {
  const columns = [];
  const placeholders = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;

    values.push(value);
    columns.push(key);
    placeholders.push(`$${values.length}`);
  }

  return {
    columnsStr: columns.join(", "),
    placeholdersStr: placeholders.join(", "),
    values,
  };
};
