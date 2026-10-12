import "dotenv/config";

// =======================================
// Helpers
// =======================================

const getReqEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }

  return value;
};

const getReqNumEnv = (name: string): number => {
  const raw = process.env[name];

  if (!raw) {
    throw new Error(`Missing required numeric env: ${name}`);
  }

  const parsed = Number(raw);

  if (Number.isNaN(parsed)) {
    throw new Error(`${name} must be a number`);
  }

  return parsed;
};

// =======================================
// Env config module
// =======================================

const ENV = {
  NODE_ENV: getReqEnv("NODE_ENV"),
  PORT: getReqNumEnv("PORT"),

  ...(process.env.NODE_ENV === "production"
    ? {
        CLIENT_URL: getReqEnv("CLIENT_URL"),

        DATABASE: {
          host: getReqEnv("DATABASE_HOST"),
          port: getReqNumEnv("DATABASE_PORT"),
          database: getReqEnv("DATABASE_NAME"),
          user: getReqEnv("DATABASE_USER"),
          password: getReqEnv("DATABASE_PASSWORD"),
        },

        ACCESS_TOKEN_SECRET: getReqEnv("ACCESS_TOKEN_SECRET"),
        REFRESH_TOKEN_SECRET: getReqEnv("REFRESH_TOKEN_SECRET"),
      }
    : {
        CLIENT_URL: getReqEnv("DEV_CLIENT_URL"),

        DATABASE: {
          host: getReqEnv("DEV_DATABASE_HOST"),
          port: getReqNumEnv("DEV_DATABASE_PORT"),
          database: getReqEnv("DEV_DATABASE_NAME"),
          user: getReqEnv("DEV_DATABASE_USER"),
          password: getReqEnv("DEV_DATABASE_PASSWORD"),
        },

        ACCESS_TOKEN_SECRET: getReqEnv("DEV_ACCESS_TOKEN_SECRET"),
        REFRESH_TOKEN_SECRET: getReqEnv("DEV_REFRESH_TOKEN_SECRET"),
      }),
} as const;

export { ENV };
