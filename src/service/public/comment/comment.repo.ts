import postgres from "../../../db/db.js";

export const getDbPostCommentById = async (postId: number) => {
  const comments = await postgres.query(
    `SELECT c.*, u.username, u.avatar 
        FROM comment c 
        INNER JOIN public.user u ON c.user_id = u.id 
        WHERE c.post_id = $1 
        ORDER BY c.created_at DESC`,
    [postId]
  );

  if (!comments.rowCount) {
    return false;
  }

  return comments.rows;
};

export const commentDbPost = async ({
  userId,
  postId,
  content,
  parentId,
}: {
  userId: string;
  postId: number;
  content: string;
  parentId: number;
}) => {
  try {
    const result = await postgres.query(
      `INSERT INTO comment 
      (post_id, user_id, content, parent_id) 
      VALUES ($1, $2, $3, $4)`,
      [postId, userId, content, parentId ? parentId : null]
    );

    if (!result.rowCount) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};
