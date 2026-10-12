export const camelCaseToSnakeCase = (value: string): string => {
  return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const objectKeysToSnakeCase = <T extends Record<string, unknown>>(
  obj: T,
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      camelCaseToSnakeCase(key),
      value,
    ]),
  );
};
