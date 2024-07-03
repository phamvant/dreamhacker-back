import { getPostFromPath } from "../../db/files.js";
import { NotFoundError } from "../../utils/error.response.js";
import { getListPost, getPostPathById } from "./post.repo.js";

export const getPostById = async (id: number) => {
  const postPath = await getPostPathById(id);

  if (!postPath) {
    throw new NotFoundError();
  }

  const postBuf = await getPostFromPath(postPath);

  if (!postBuf) {
    throw new NotFoundError();
  }

  return postBuf;
};

export const getListPostByCategory = async (category: number, page: number) => {
  const listPost = await getListPost(category, page);

  if (!listPost) {
    throw new NotFoundError();
  }

  return listPost;
};
