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
       INNER JOIN public.user u ON p.author_id = u.id
       WHERE p.category_id = $1
       LIMIT $2 OFFSET $3`,
    [category, pageSize, pageSize * (page - 1)]
  );

  if (!ret.rowCount) {
    return false;
  }

  const posts = ret.rows;

  return posts;
};

export const getTotalPageOfCategory = async (category: number) => {
  const ret = await postgres.query(
    `
    SELECT total_post FROM category WHERE id=$1
    `,
    [category]
  );

  if (!ret.rowCount) {
    return false;
  }

  return (Math.round(ret.rows[0].total_post / pageSize) + 1) as number;
};
