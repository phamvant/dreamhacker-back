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
