import postgres from "../../db/db.js";

export const getPostPathById = async (id: number) => {
  const ret = await postgres.query(`SELECT link from public.post WHERE id=$1`, [
    id,
  ]);

  if (!ret.rowCount) {
    return false;
  }

  const postPath = ret.rows[0].link;

  return postPath;
};

export const getListPost = async (category: number, page: number) => {
  const pageSize = 10;

  const ret = await postgres.query(
    `SELECT * FROM public.post WHERE category_id=$1 LIMIT $2 OFFSET $3`,
    [category, pageSize, pageSize * (page - 1)],
  );

  if (!ret.rowCount) {
    return false;
  }

  const posts = ret.rows;

  return posts;
};
