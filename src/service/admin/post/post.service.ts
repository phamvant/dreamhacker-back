import postgres from "../../../db/db.js";

export const saveDbPost = async (
  title: string,
  content: string,
  userId: string
) => {
  const ret = await postgres.query(
    `
    INSERT INTO post (title, content, is_scrap, category_id, is_published, author_id)
    VALUES ($1, $2, FALSE, 1, TRUE, $3)
    `,
    [title, content, userId]
  );

  if (!ret.rowCount) {
    return false;
  }

  return ret;
};
