import {
  BadRequestError,
  NotFoundError,
} from "../../../utils/error.response.js";
import { getBasicPostInfo } from "../post/post.service.js";
import { commentDbPost, getDbPostCommentById } from "./comment.repo.js";

export const getPostCommentById = async (postId: number) => {
  const post = await getBasicPostInfo(postId);

  if (!post) {
    throw new NotFoundError({ message: "No post found" });
  }

  const comments = await getDbPostCommentById(postId);

  if (!comments) {
    throw new NotFoundError({ message: "No comment found" });
  }

  return comments;
};

export const commentPost = async ({
  userId,
  postId,
  content,
  parentId,
}: {
  userId: string;
  postId: number;
  content: string;
  parentId: number;
}) => {
  const isCommented = await commentDbPost({
    userId: userId,
    postId: postId,
    content: content,
    parentId: parentId,
  });

  if (!isCommented) {
    throw new BadRequestError({ message: "Can't comment" });
  }

  return true;
};
