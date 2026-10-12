export const AUTH_TOKENS = {
  ACCESS_TOKEN: {
    name: "access_token",
    cookieMaxAge: 15 * 60 * 1000,
  },
  REFRESH_TOKEN: {
    name: "refresh_token",
    cookieMaxAge: 24 * 60 * 60 * 1000,
  },
};
