import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "express-oauth2-jwt-bearer";
import CONFIG from "../../config/config.js";
import { ErrorResponse } from "../../utils/error.response.js";
import { SUCCESS } from "../../utils/success.response.js";

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError();
  }

  req.logout((err) => {
    if (err) {
      throw new ErrorResponse({});
    }

    new SUCCESS().send(res);
  });
};
