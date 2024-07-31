import { Request, Response, NextFunction } from "express";
import { SUCCESS } from "../../utils/success.response.js";
import {
  getFeaturePost,
  getPostById,
} from "../../service/public/post/post.service.js";

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
