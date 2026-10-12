import { NextFunction, Request, Response } from "express";

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
