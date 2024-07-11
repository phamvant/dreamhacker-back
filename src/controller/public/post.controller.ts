import { Request, Response, NextFunction } from "express";
import {
  getListPostByCategory,
  savePost,
} from "../../service/post/post.service.js";
import { getPostById } from "../../service/post/post.service.js";
import { NotFoundError } from "../../utils/error.response.js";
import { CREATE, SUCCESS } from "../../utils/success.response.js";

export const getListPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
) => {
  const id = req.params.id;

  const post = await getPostById(Number(id));

  console.log(post);

  new SUCCESS({ metadata: post }).send(res);
};

export const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.user as { id: string };
  const { content, title } = req.body;

  const ret = await savePost(title, content, id);

  new CREATE({}).send(res);
};
