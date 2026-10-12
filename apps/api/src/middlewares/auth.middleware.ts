import jwt from "jsonwebtoken";
import { AUTH_TOKENS } from "@/constants/auth.constant";
import { Middleware } from "@/types/handlers";
import { AppError } from "@/utils/errors/AppError";
import { ENV } from "@/config/env";
import { AccessTokenPayload } from "@/modules/auth/auth.types";
import { pool } from "@/infrastructure/database/pool";
import { USER_PUBLIC_PROJECTION } from "@/infrastructure/database/query/user.query";
import { UserRole } from "@courtdesk/shared";

export const protectRoute: Middleware = async (req, res, next) => {
  const accessToken = req.cookies[AUTH_TOKENS.ACCESS_TOKEN.name];

  if (!accessToken) {
    throw new AppError(401, "Unauthorized - No access token provided");
  }

  let decoded: AccessTokenPayload;

  try {
    decoded = jwt.verify(
      accessToken,
      ENV.ACCESS_TOKEN_SECRET,
    ) as AccessTokenPayload;
  } catch (error) {
    throw new AppError(401, "Unauthorized - Invalid Access Token");
  }

  const { rows } = await pool.query(
    `
    SELECT ${USER_PUBLIC_PROJECTION}
    FROM users 
    WHERE id = $1
    `,
    [decoded.id],
  );

  const user = rows[0];

  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  req.user = user;

  next();
};

export const authorizeRoles = (roles: UserRole[]): Middleware => {
  return (req, res, next) => {
    const user = req.user;

    if (user && !roles.includes(user?.role)) {
      throw new AppError(
        403,
        "Forbidden - You don't have the permission to access this resource",
      );
    }

    next();
  };
};
