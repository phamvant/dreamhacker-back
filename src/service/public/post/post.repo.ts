import { QueryResult } from "pg";
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

export const getDbPostById = async (postId: number) => {
  const ret = await postgres.query(
    `SELECT p.id, p.title, p.content, p.is_scrap, p.category_id, p.likes, p.total_comments, p.saved, p.created_at, p.author_id, u.username, u.avatar
    FROM public.post p
    INNER JOIN public.user u ON p.author_id = u.id
    WHERE p.id = $1`,
    [postId]
  );

  if (!ret.rowCount) {
    return false;
  }

  return ret as QueryResult<IPost>;
};

export const getListPost = async (category: number, page: number) => {
  const pageSize = 10;

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
