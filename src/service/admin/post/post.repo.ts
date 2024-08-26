import { BadRequestError } from "../../../utils/error.response.js";
import { IPost } from "../../public/post/post.repo.js";
import { saveDbPost } from "./post.service.js";
import postgres from "../../../db/db.js";

export const savePost = async (
  title: string,
  content: string,
  userId: string
) => {
  const ret = await saveDbPost(title, content, userId);

  if (!ret) {
    throw new BadRequestError({ message: "Can't save post" });
  }

  return ret;
};

export const getDbPostByIdAdmin = async (postId: number) => {
  let ret = await postgres.query(
    `SELECT 
      p.id, 
      p.category_id, 
      p.likes, 
      p.total_comments, 
      p.saved, 
      p.created_at, 
      p.author_id, 
      p.is_edited,
      u.username, 
      u.avatar,
      MAX(CASE WHEN pu.lang = 'vn' THEN pu.title ELSE NULL END) AS title_vn,
      MAX(CASE WHEN pu.lang = 'en' THEN pu.title ELSE NULL END) AS title_en,
      MAX(CASE WHEN pu.lang = 'cn' THEN pu.title ELSE NULL END) AS title_cn,
      MAX(CASE WHEN pu.lang = 'vn' THEN pu.content ELSE NULL END) AS content_vn,
      MAX(CASE WHEN pu.lang = 'en' THEN pu.content ELSE NULL END) AS content_en,
      MAX(CASE WHEN pu.lang = 'cn' THEN pu.content ELSE NULL END) AS content_cn
    FROM 
      public.post p
    INNER JOIN 
      public.user u ON p.author_id = u.id
    INNER JOIN 
      public.post_universal pu ON p.id = pu.post_id
    WHERE 
      p.id = $1
    GROUP BY 
      p.id, p.category_id, p.likes, p.total_comments, p.saved, p.created_at, p.author_id, u.username, u.avatar`,
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

  return ret.rows[0] as IPost;
};

export const getDbListPostAdmin = async (
  category: number,
  page: number,
  userId?: string
) => {
  const ret = await postgres.query(
    `SELECT 
      p.id, 
      pu.title, 
      LEFT(pu.content, 150) AS content,
      p.category_id, 
      p.likes, 
      p.total_comments, 
      p.saved, 
      p.created_at, 
      p.author_id, 
      p.is_edited,
      u.username, 
      l.user_id as is_liked,
      u.avatar
    FROM public.post p
    INNER JOIN public.user u ON p.author_id = u.id
    INNER JOIN public.post_universal pu ON p.id = pu.post_id
    LEFT JOIN public.like l ON p.id = l.post_id AND l.user_id = $4
    WHERE p.category_id = $1
    AND pu.lang = 'vn'
    ORDER BY p.created_at DESC
    LIMIT $2 
    OFFSET $3`,
    [category, 10, 10 * (page - 1), userId || null]
  );

  if (!ret.rowCount) {
    return false;
  }

  const posts = ret.rows;

  return posts;
};
