import { Server } from "http";
import { pool } from "../database/pool";

export const shutdown = (signal: string, server: Server) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  server.close(async () => {
    console.log("HTTP server closed.");

    try {
      await pool.end();

      console.log("DB pool closed.");

      process.exit(0);
    } catch (error) {
      console.error("Error during graceful shutdown:", error);
      process.exit(0);
    }
  });
};
