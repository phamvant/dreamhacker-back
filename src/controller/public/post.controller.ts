import { Request, Response, NextFunction } from "express";
import { CREATE, SUCCESS } from "../../utils/success.response.js";
import {
  getFeaturePost,
  getPostById,
} from "../../service/public/post/post.service.js";
import { UnAuthorizedError } from "../../utils/error.response.js";
import { updateDbPostVote } from "../../service/public/post/post.repo.js";

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

export const increaseLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as { id: string };
  const postId = req.params.id;

  if (!id) {
    throw new UnAuthorizedError({ message: "User not found" });
  }

  const ret = await updateDbPostVote(1, Number(postId), id);

  new CREATE().send(res);
};

export const decreaseLikeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as { id: string };
  const postId = req.params.id;

  if (!id) {
    throw new UnAuthorizedError({ message: "User not found" });
  }

  const ret = updateDbPostVote(-1, Number(postId), id);

  new SUCCESS().send(res);
};
