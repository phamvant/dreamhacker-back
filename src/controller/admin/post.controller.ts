import { NextFunction, Request, Response } from "express";
import { savePost } from "../../service/admin/post/post.repo.js";
import { CREATE } from "../../utils/success.response.js";

export const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as { id: string };
  const { content, title } = req.body;

  const ret = await savePost(title, content, id);

  new CREATE().send(res);
};
