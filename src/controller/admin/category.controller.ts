import { NextFunction, Request, Response } from "express";
import { SUCCESS } from "../../utils/success.response.js";
import { getListPostByCategoryAdmin } from "../../service/public/post/post.service.js";
import { NotFoundError } from "../../utils/error.response.js";

export const getListPostAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let userId;

  if (req.user && "id" in req.user) {
    userId = req.user.id;
  }

  const categoryId = parseInt(req.query.id as string);
  const page = parseInt(req.query.page as string);

  if (!categoryId || !page) {
    throw new NotFoundError({ message: "Query not valid" });
  }

  const ret = await getListPostByCategoryAdmin(categoryId, page, userId);

  if (!ret) {
    throw new NotFoundError({ message: "Not resource found" });
  }

  new SUCCESS({ metadata: ret }).send(res);
};
