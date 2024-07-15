import postgres from "../../../db/db.js";

export const getDbPostById = async (id: number) => {
  const ret = await postgres.query(
    `SELECT title, content, is_scrap, category_id, likes, total_comments, saved, created_at, author_id from public.post WHERE id=$1`,
    [id],
  );

  if (!ret.rowCount) {
    return false;
  }

  return ret;
};

export const getListPost = async (category: number, page: number) => {
  const pageSize = 10;

  const ret = await postgres.query(
    `SELECT p.id, p.title, p.content, p.is_scrap, p.category_id, p.likes, p.total_comments, p.saved, p.created_at, p.author_id, u.username
       FROM public.post p
       INNER JOIN public.user u ON p.author_id = u.id
       WHERE p.category_id = $1
       LIMIT $2 OFFSET $3`,
    [category, pageSize, pageSize * (page - 1)],
  );

  if (!ret.rowCount) {
    return false;
  }

  const posts = ret.rows;

  return posts;
};
