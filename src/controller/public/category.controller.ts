import { NextFunction, Request, Response } from "express";
import { SUCCESS } from "../../utils/success.response.js";
import {
  getAllCategoryInfo,
  getListPostByCategory,
} from "../../service/public/post/post.service.js";
import { NotFoundError } from "../../utils/error.response.js";

export const getAllCategoryInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryInfo = await getAllCategoryInfo();

  new SUCCESS({ metadata: categoryInfo }).send(res);
};

export const getListPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = parseInt(req.query.id as string);
  const page = parseInt(req.query.page as string);

  if (!categoryId || !page) {
    throw new NotFoundError({ message: "Query not valid" });
  }

  const ret = await getListPostByCategory(categoryId, page);

  if (!ret) {
    throw new NotFoundError({ message: "Not resource found" });
  }

  new SUCCESS({ metadata: ret }).send(res);
};
