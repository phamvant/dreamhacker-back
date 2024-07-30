import { NotFoundError } from "../../../utils/error.response.js";
import {
  getAllCategoryInfoRepo,
  getCategoryInfoById,
  getDBFeaturePost,
  getDbPostById,
  getListPost,
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

  const categoryInfo = await getCategoryInfoById(category);

  if (!(categoryInfo && listPost)) {
    throw new NotFoundError();
  }

  console.log(categoryInfo);

  return { posts: listPost, categoryInfo: categoryInfo };
};

export const getFeaturePost = async (numberOfPost: number) => {
  const featurePosts = await getDBFeaturePost(numberOfPost);

  if (!featurePosts) {
    throw new NotFoundError();
  }

  return featurePosts;
};

export const getAllCategoryInfo = async () => {
  const allCategoryInfo = await getAllCategoryInfoRepo();

  if (!allCategoryInfo) {
    throw new NotFoundError();
  }

  return allCategoryInfo;
};
