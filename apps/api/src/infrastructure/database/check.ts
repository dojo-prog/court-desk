import { ENV } from "@/config/env";
import { pool } from "./pool";

export const checkDbConn = async () => {
  const environment = ENV.NODE_ENV === "production" ? "PROD" : "DEV";

  try {
    await pool.query("SELECT 1");

    console.log(`Postgres ${environment} Database connected`);
  } catch (error) {
    console.error(`Failed to connect to ${environment} database`);
    throw error;
  }
};
