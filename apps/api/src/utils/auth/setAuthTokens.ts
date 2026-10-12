import { AUTH_TOKENS, baseCookieOptions } from "@/constants/auth.constant";
import { Response } from "express";

export const setAuthTokens = (
  res: Response,
  accessToken: string,
  refreshToken?: string,
) => {
  const { ACCESS_TOKEN, REFRESH_TOKEN } = AUTH_TOKENS;

  res.cookie(ACCESS_TOKEN.name, accessToken, {
    ...baseCookieOptions,
    maxAge: ACCESS_TOKEN.cookieMaxAge,
  });

  if (refreshToken) {
    res.cookie(REFRESH_TOKEN.name, refreshToken, {
      ...baseCookieOptions,
      maxAge: REFRESH_TOKEN.cookieMaxAge,
    });
  }
};
