import { getPostFromPath } from "../../db/files.js";
import { NotFoundError } from "../../utils/error.response.js";
import { getDbPostById, getListPost, save } from "./post.repo.js";

export const getPostById = async (id: number) => {
  const post = await getDbPostById(id);

  if (!post) {
    throw new NotFoundError();
  }

  if (!post.rows[0].is_scrap) {
    return post.rows[0];
  }
};

export const getListPostByCategory = async (category: number, page: number) => {
  const listPost = await getListPost(category, page);

  if (!listPost) {
    throw new NotFoundError();
  }

  return listPost;
};

export const savePost = async (
  title: string,
  content: string,
  userId: string,
) => {
  const ret = await save(title, content, userId);

  return ret;
};
