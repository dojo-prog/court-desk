export const calculateTotalPages = (total: number, limit: number) =>
  Math.ceil(total / limit);
