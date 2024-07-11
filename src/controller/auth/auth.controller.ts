import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/error.response.js";
import config from "../../config/config.js";

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.redirect(`${config.FRONTEND_URL}`);
  }

  req.logout((err) => {
    if (err) {
      throw new ErrorResponse({});
    }

    return res.redirect(`${config.FRONTEND_URL}`);
  });
};
