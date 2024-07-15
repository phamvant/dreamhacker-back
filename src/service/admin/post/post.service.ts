import postgres from "../../../db/db.js";

export const save = async (title: string, content: string, userId: string) => {
  const ret = await postgres.query(
    `
    INSERT INTO post (title, content, is_scrap, category_id, is_published, author_id)
    VALUES ($1, $2, FALSE, 1, TRUE, $3)
    `,
    [title, content, userId],
  );

  console.log(ret);

  return ret;
};
