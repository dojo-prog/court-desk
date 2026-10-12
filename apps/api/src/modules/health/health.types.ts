export type ReadinessResult = {
  status: "ready" | "not_ready";
  check: {
    database: "up" | "down";
  };
};
