import { Controller } from "@/types/handlers";
import { setAuthTokens } from "@/utils/auth/setAuthTokens";
import { AUTH_TOKENS, baseCookieOptions } from "@/constants/auth.constant";

import * as authService from "./auth.service";

export const getCurrentUser: Controller = async (req, res, next) => {
  res.status(200).json({ success: true, data: { user: req.user } });
};

export const login: Controller = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, userPublic } = await authService.login(
      req.body,
    );

    setAuthTokens(res, accessToken, refreshToken);

    res.status(200).json({ success: true, data: { user: userPublic } });
  } catch (error) {
    next(error);
  }
};

export const logout: Controller = async (req, res, next) => {
  try {
    const { ACCESS_TOKEN, REFRESH_TOKEN } = AUTH_TOKENS;

    res.clearCookie(ACCESS_TOKEN.name, {
      ...baseCookieOptions,
      maxAge: ACCESS_TOKEN.cookieMaxAge,
    });
    res.clearCookie(REFRESH_TOKEN.name, {
      ...baseCookieOptions,
      maxAge: REFRESH_TOKEN.cookieMaxAge,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken: Controller = async (req, res, next) => {
  try {
    const { REFRESH_TOKEN } = AUTH_TOKENS;

    const refreshToken = req.cookies[REFRESH_TOKEN.name];

    const accessToken = await authService.refreshAccessToken(refreshToken);

    setAuthTokens(res, accessToken);

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
