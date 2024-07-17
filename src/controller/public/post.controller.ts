import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../utils/error.response.js";
import { SUCCESS } from "../../utils/success.response.js";
import {
  getFeaturePost,
  getListPostByCategory,
  getPostById,
} from "../../service/public/post/post.service.js";

export const getListPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = parseInt(req.query.category as string);
  const page = parseInt(req.query.page as string);

  console.log(categoryId, page);

  if (!categoryId || !page) {
    throw new NotFoundError({ message: "Query not valid" });
  }

  const ret = await getListPostByCategory(categoryId, page);

  if (!ret) {
    throw new NotFoundError({ message: "Not resource found" });
  }

  new SUCCESS({ metadata: ret }).send(res);
};

export const getPostByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  const post = await getPostById(Number(id));

  new SUCCESS({ metadata: post }).send(res);
};

export const getFeaturePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const numberOfPost = parseInt(req.query.number as string);

  const posts = await getFeaturePost(numberOfPost);

  new SUCCESS({ metadata: posts }).send(res);
};
