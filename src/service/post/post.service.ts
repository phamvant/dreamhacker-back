import { getPostFromPath } from "../../db/files.js";
import { getListPost, getPostPathById } from "./post.repo.js";

export const getPostById = async (id: number) => {
  const postPath = await getPostPathById(id);

  if (!postPath) {
    throw new Error();
  }

  const postBuf = await getPostFromPath(postPath);

  return postBuf;
};

export const getListPostByCategory = async (category: number, page: number) => {
  const listPost = await getListPost(category, page);

  if (!listPost) {
    throw new Error();
  }

  return listPost;
};
