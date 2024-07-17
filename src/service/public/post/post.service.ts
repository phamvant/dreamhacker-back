import { NotFoundError } from "../../../utils/error.response.js";
import {
  getDBFeaturePost,
  getDbPostById,
  getListPost,
  getTotalPageOfCategory,
} from "./post.repo.js";

export const getPostById = async (id: number) => {
  const post = await getDbPostById(id);

  if (!post) {
    throw new NotFoundError();
  }

  if (!post.is_scrap) {
    return post;
  }

  return post;
};

export const getListPostByCategory = async (category: number, page: number) => {
  const listPost = await getListPost(category, page);

  const totalPage = await getTotalPageOfCategory(category);

  if (!(totalPage && listPost)) {
    throw new NotFoundError();
  }

  return { posts: listPost, totalPage: totalPage };
};

export const getFeaturePost = async (numberOfPost: number) => {
  const featurePosts = await getDBFeaturePost(numberOfPost);

  if (!featurePosts) {
    throw new NotFoundError();
  }

  return featurePosts;
};
