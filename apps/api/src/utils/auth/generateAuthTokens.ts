import jwt from "jsonwebtoken";
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "@/modules/auth/auth.types";
import { ENV } from "@/config/env";

export const generateAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: RefreshTokenPayload) => {
  return jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
