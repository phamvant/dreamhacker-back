import postgres from "../../../db/db.js";
import { NotFoundError } from "../../../utils/error.response.js";
import { getCategoryInfoById } from "../../public/post/post.repo.js";
import { getDbListPostAdmin, getDbPostByIdAdmin } from "./post.repo.js";

export const saveDbPost = async (
  title: string,
  content: string,
  userId: string
) => {
  const ret = await postgres.query(
    `
    INSERT INTO post (title, content, is_scrap, category_id, is_published, author_id)
    VALUES ($1, $2, FALSE, 1, TRUE, $3)
    `,
    [title, content, userId]
  );

  if (!ret.rowCount) {
    return false;
  }

  return ret;
};

export const getPostByIdAdmin = async (id: number) => {
  const post = await getDbPostByIdAdmin(id);

  if (!post) {
    throw new NotFoundError();
  }

  if (!post.is_scrap) {
    return post;
  }

  return post;
};

export const getListPostByCategoryAdmin = async (
  category: number,
  page: number,
  userId?: string
) => {
  const listPost = await getDbListPostAdmin(category, page, userId);

  const categoryInfo = await getCategoryInfoById(category);

  if (!(categoryInfo && listPost)) {
    throw new NotFoundError();
  }

  return { posts: listPost, categoryInfo: categoryInfo };
};
