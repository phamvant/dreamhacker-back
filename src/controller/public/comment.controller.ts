import { Request, Response, NextFunction } from "express";
import { SUCCESS } from "../../utils/success.response.js";
import {
  commentPost,
  getPostCommentById,
} from "../../service/public/comment/comment.service.js";

export const getPostCommentByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const comments = await getPostCommentById(Number(id));

  new SUCCESS({ metadata: comments }).send(res);
};

export const commentPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const { id } = req.user as { id: string };
  const { id, postId, content, parentId } = req.body;

  const comment = await commentPost({
    userId: id,
    postId: Number(postId),
    content: content,
    parentId: Number(parentId),
  });

  new SUCCESS().send(res);
};
