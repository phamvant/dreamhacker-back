import { NextFunction, Request, Response } from "express";
import { getAllCategoryInfo } from "../../service/public/post/post.service";
import { SUCCESS } from "../../utils/success.response";

export const getAllCategoryInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryInfo = await getAllCategoryInfo();

  new SUCCESS({ metadata: categoryInfo }).send(res);
};
