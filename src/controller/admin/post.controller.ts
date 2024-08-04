import { NextFunction, Request, Response } from "express";
import { savePost } from "../../service/admin/post/post.repo.js";
import { CREATE, SUCCESS } from "../../utils/success.response.js";
import { modifyPost } from "../../service/public/post/post.service.js";

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

export const modifyPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.id;
  const { id } = req.user as { id: string };
  const { content, title, lang } = req.body;

  const isModified = await modifyPost({
    role: res.locals.role,
    userId: id,
    postId: Number(postId),
    title: title,
    content: content,
    lang: lang,
  });

  new SUCCESS({ metadata: isModified }).send(res);
};
