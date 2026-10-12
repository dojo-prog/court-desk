export type GetResult<K extends string, T> = {
  [P in K]: T[];
} & {
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
};
