import {
  NotFoundError,
  UnAuthorizedError,
} from "../../../utils/error.response.js";
import {
  getAllCategoryInfoRepo,
  getCategoryInfoById,
  getDBFeaturePost,
  getDbPostById,
  getListPost,
  modifyDbPost,
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

export const modifyPost = async ({
  userId,
  postId,
  title,
  content,
}: {
  userId: string;
  postId: number;
  title: string;
  content: string;
}) => {
  const post = await getDbPostById(postId);

  if (!post) {
    throw new NotFoundError();
  }

  if (post.author_id !== userId) {
    throw new UnAuthorizedError();
  }

  const isModified = await modifyDbPost(postId, title, content);

  if (!isModified) {
    throw new Error("Cant modify");
  }

  return true;
};
