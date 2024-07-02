import { NextFunction, Request, Response } from "express";
import { SUCCESS } from "../../utils/success.response.js";

const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  new SUCCESS({ metadata: req.params.id }).send(res);
};
