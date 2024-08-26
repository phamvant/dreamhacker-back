import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../../../utils/error.response.js";
import {
  getAllCategoryInfoRepo,
  getCategoryInfoById,
  getDBFeaturePost,
  getDbListPost,
  getDbPostById,
  getDbPostInfo,
  modifyDbPost,
  togglePostDbEdited,
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

export const getListPostByCategory = async (
  category: number,
  page: number,
  userId?: string
) => {
  const listPost = await getDbListPost(category, page, userId);

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
  role,
  userId,
  postId,
  title,
  content,
  lang,
}: {
  role: string;
  userId: string;
  postId: number;
  title: string;
  content: string;
  lang: string;
}) => {
  const post = await getDbPostInfo(postId);

  if (!post) {
    throw new NotFoundError();
  }

  if (role !== "ADMIN") {
    if (post.author_id !== userId) {
      throw new UnAuthorizedError();
    }
  }

  const isModified = await modifyDbPost(postId, title, content, lang);

  if (!isModified) {
    throw new Error("Cant modify");
  }

  return true;
};

export const getBasicPostInfo = async (postId: number) => {
  const post = await getDbPostInfo(postId);

  return post;
};

export const togglePostEdited = async (postId: number) => {
  const post = await togglePostDbEdited(postId);

  if (!post) {
    throw new BadRequestError();
  }

  return post;
};
