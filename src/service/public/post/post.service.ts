import { NotFoundError } from "../../../utils/error.response.js";
import {
  getDbPostById,
  getListPost,
  getTotalPageOfCategory,
} from "./post.repo.js";

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

  const totalPage = await getTotalPageOfCategory(category);

  if (!(totalPage && listPost)) {
    throw new NotFoundError();
  }

  return { posts: listPost, totalPage: totalPage };
};
