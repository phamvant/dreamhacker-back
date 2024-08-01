import postgres from "../../../db/db.js";

interface IPost {
  id: number;
  title: string;
  content: string;
  is_scrap: boolean;
  category_id: number;
  likes: number;
  total_comments: number;
  saved: number;
  created_at: string;
  authro_id: string;
  username: string;
  avatar: string;
}

const pageSize = 10;

export const getDBFeaturePost = async (numberOfPost: number) => {
  const feature = await postgres.query(
    `
   SELECT p.id, p.title, p.content, p.is_scrap, p.category_id, p.likes, p.total_comments, p.saved, p.created_at, p.author_id, u.username, u.avatar
       FROM public.post p
       INNER JOIN public.user u ON p.author_id = u.id
       ORDER BY p.clicked DESC
       LIMIT $1
    `,
    [numberOfPost]
  );

  if (!feature.rowCount) {
    return false;
  }

  return feature.rows;
};

export const getDbPostById = async (postId: number) => {
  let ret = await postgres.query(
    `SELECT p.id, p.title, p.content, p.is_scrap, p.category_id, p.likes, p.total_comments, p.saved, p.created_at, p.author_id, u.username, u.avatar
    FROM public.post p
    INNER JOIN public.user u ON p.author_id = u.id
    WHERE p.id = $1`,
    [postId]
  );

  if (!ret.rowCount) {
    return false;
  }

  let clickCount = await postgres.query(
    `UPDATE public.post
    SET clicked = clicked + 1
    WHERE id = $1`,
    [postId]
  );

  console.log(clickCount);

  return ret.rows[0] as IPost;
};

export const getListPost = async (category: number, page: number) => {
  const ret = await postgres.query(
    `SELECT p.id, p.title, p.content, p.is_scrap, p.category_id, p.likes, p.total_comments, p.saved, p.created_at, p.author_id, u.username, u.avatar
       FROM public.post p
       INNER JOIN public.user u
       ON p.author_id = u.id
       WHERE p.category_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
    [category, pageSize, pageSize * (page - 1)]
  );

  if (!ret.rowCount) {
    return false;
  }

  const posts = ret.rows;

  return posts;
};

export const getCategoryInfoById = async (category: number) => {
  const ret = await postgres.query(
    `
    SELECT c.total_post, c.name as category_name, p.name as program_name
    FROM public.category c
    INNER JOIN public.program p
    ON c.program_id = p.id
    WHERE c.id = $1
    `,
    [category]
  );

  if (!ret.rowCount) {
    return false;
  }

  const { total_post, category_name, program_name } = ret.rows[0];

  return {
    totalPage: Math.round(total_post / pageSize) as number,
    categoryName: category_name,
    programName: program_name,
  };
};

export const getAllCategoryInfoRepo = async () => {
  const ret = await postgres.query(
    `
    SELECT c.id as category_id, c.name as category_name, p.name as program_name
    FROM public.category c
    INNER JOIN public.program p
    ON c.program_id = p.id
    ORDER BY c.id;
    `
  );

  if (!ret.rowCount) {
    return false;
  }

  const clasify = ret.rows.reduce((acc, cur) => {
    const { category_id, category_name, program_name } = cur;

    if (!acc[program_name]) {
      acc[program_name] = [];
    }

    acc[program_name].push({ name: category_name, id: category_id });

    return acc;
  }, {});

  return clasify;
};

export const modifyDbPost = async (postId, title, content) => {
  const updatePost = await postgres.query(
    `
      UPDATE public.post (title, content)
      VALUES ($1, $2)
      WHERE id=$3;
    `,
    [title, content, postId]
  );

  if (!updatePost.rowCount) {
    return false;
  }

  return true;
};
