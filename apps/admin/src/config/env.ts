const getReqEnv = (name: string) => {
  const value = import.meta.env[name];

  if (!value) {
    console.error("error");
    throw new Error(`Missing req env: ${name}`);
  }

  return value;
};

export const env = {
  environment: getReqEnv("VITE_ENVIRONMENT"),
  appName: getReqEnv("VITE_APP_NAME"),

  ...(import.meta.env.VITE_ENVIRONMENT === "production"
    ? {
        apiUrl: getReqEnv("VITE_API_URL"),
      }
    : {
        apiUrl: getReqEnv("VITE_DEV_API_URL"),
      }),
} as const;
