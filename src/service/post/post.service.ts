import { getPostFromPath } from "../../db/files.js";
import { getPostPathById } from "./post.repo.js";

export const getPostById = async (id: number) => {
  const postPath = await getPostPathById(id);

  if (!postPath) {
    throw new Error();
  }

  const postBuf = await getPostFromPath(postPath);

  return postBuf;
};
