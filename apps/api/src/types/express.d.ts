import { UserPublicEntity } from "@courtdesk/shared";

declare global {
  namespace Express {
    interface Request {
      user?: UserPublicEntity;
    }
  }
}
