export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type PaginatedData<K extends string, T> = {
  [P in K]: T[];
} & {
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
};
