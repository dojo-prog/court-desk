export type PostgresError = Error & {
  code?: string;
  constraint?: string;
  detail?: string;
};
