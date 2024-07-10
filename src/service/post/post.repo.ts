import postgres from "../../db/db.js";

export const getPostPathById = async (id: number) => {
  const ret = await postgres.query(
    `SELECT content, is_scrap from public.post WHERE id=$1`,
    [id]
  );

  if (!ret.rowCount) {
    return false;
  }

  return ret;
};

export const getListPost = async (category: number, page: number) => {
  const pageSize = 10;

  const ret = await postgres.query(
    `SELECT * FROM public.post WHERE category_id=$1 LIMIT $2 OFFSET $3`,
    [category, pageSize, pageSize * (page - 1)]
  );

  if (!ret.rowCount) {
    return false;
  }

  const posts = ret.rows;

  return posts;
};

export const save = async (content: string, user_id: string, title: string) => {
  const ret = await postgres.query(
    `
    INSERT INTO post (title, content, is_scrap, category_id, is_published, author_id)
    VALUES ($1, $2, FALSE, 8, TRUE, $3)
    `,
    [title, content, user_id]
  );

  return ret;
};
