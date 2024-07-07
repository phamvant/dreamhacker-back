import { Request, Response, NextFunction } from "express";
import { UnAuthorizedError } from "../utils/error.response.js";
import { asyncHandler } from "../utils/async.handler.js";

export const ensureAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }
    throw new UnAuthorizedError();
  },
);
