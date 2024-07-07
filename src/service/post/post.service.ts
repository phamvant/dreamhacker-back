import { getPostFromPath } from "../../db/files.js";
import { NotFoundError } from "../../utils/error.response.js";
import { getListPost, getPostPathById, publish } from "./post.repo.js";

export const getPostById = async (id: number) => {
  const post = await getPostPathById(id);

  if (!post) {
    throw new NotFoundError();
  }

  if (post.rows[0].is_scrap) {
    const postBuf = await getPostFromPath(post.rows[0].content);

    if (!postBuf) {
      throw new NotFoundError();
    }

    return postBuf;
  }
};

export const getListPostByCategory = async (category: number, page: number) => {
  const listPost = await getListPost(category, page);

  if (!listPost) {
    throw new NotFoundError();
  }

  return listPost;
};

export const publishPost = async (
  content: string,
  user_id: string,
  title: string,
) => {
  const ret = await publish(content, user_id, title);
};
