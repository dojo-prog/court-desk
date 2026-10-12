interface Result {
  setClause: string;
  values: unknown[];
}

export const buildUpdateQueryParts = (
  changes: Record<string, unknown>,
): Result => {
  const changesKeys = Object.keys(changes);

  const setFields = changesKeys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const values = changesKeys.map((k) => changes[k]);

  return {
    setClause: `SET ${setFields}`,
    values,
  };
};
