import { Request, Response, NextFunction } from "express";
import { UnAuthorizedError } from "../utils/error.response.js";
import { asyncHandler } from "../utils/async.handler.js";
import {
  getRoleById,
  getUserAvatarById,
} from "../auth/services/auth.service.js";

export const checkRole = (role?: string) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.user as { id: string };
      const userRole = await getRoleById(id);
      const avatar = await getUserAvatarById(id);

      if (role) {
        if (req.isAuthenticated() && userRole === role) {
          return next();
        }
      } else {
        res.locals.role = userRole;
        res.locals.avatar = avatar;
        return next();
      }
      throw new UnAuthorizedError();
    }
  );
};

export const checkPermission = (permission: string) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // const userPermission = await
    }
  );
};
