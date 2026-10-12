import http from "http";
import { checkDbConn } from "./infrastructure/database/check";
import { app } from "./app";
import { ENV } from "./config/env";
import { shutdown } from "./infrastructure/shutdown/graceful-shutdown";

const startServer = async () => {
  try {
    await checkDbConn();

    const server = http.createServer(app);

    server.on("error", (error) => {
      console.error("Server encountered an error:", error);
      process.exit(1);
    });

    server.listen(ENV.PORT, () => {
      console.log(`Server listening on port ${ENV.PORT}`);
    });

    process.on("SIGTERM", () => shutdown("SIGTERM", server));
    process.on("SIGINT", () => shutdown("SIGINT", server));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
