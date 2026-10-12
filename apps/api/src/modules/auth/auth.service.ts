import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginBody } from "@courtdesk/shared";
import { AppError } from "@/utils/errors/AppError";
import { LoginResult, RefreshTokenPayload } from "./auth.types";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth/generateAuthTokens";

import * as authRepository from "./auth.repository";
import { ENV } from "@/config/env";

export const login = async (payload: LoginBody): Promise<LoginResult> => {
  const { email, password } = payload;

  const userPrivate = await authRepository.findPrivateByEmail(email);

  if (!userPrivate) {
    throw new AppError(400, "Invalid email or password");
  }

  const correctPassword = await bcrypt.compare(
    password,
    userPrivate.password_hash,
  );
  if (!correctPassword) {
    throw new AppError(400, "Invalid email or password");
  }

  const { password_hash, ...userPublic } = userPrivate;

  return {
    accessToken: generateAccessToken({ id: userPrivate.id }),
    refreshToken: generateRefreshToken({
      id: userPrivate.id,
      role: userPrivate.role,
    }),
    userPublic,
  };
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<string> => {
  if (!refreshToken) {
    throw new AppError(401, "Unauthorized - No refresh token provided");
  }

  let decoded: RefreshTokenPayload;

  try {
    decoded = jwt.verify(
      refreshToken,
      ENV.REFRESH_TOKEN_SECRET,
    ) as RefreshTokenPayload;
  } catch (error) {
    throw new AppError(401, "Unauthorized - Invalid refresh token");
  }

  const userPublic = await authRepository.findPublicById(decoded.id);

  if (!userPublic) {
    throw new AppError(401, "Unauthorized");
  }
  return generateAccessToken({ id: userPublic.id });
};
