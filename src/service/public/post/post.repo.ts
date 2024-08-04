import postgres from "../../../db/db.js";

export interface IPost {
  id: number;
  title: string;
  content: string;
  is_scrap: boolean;
  category_id: number;
  likes: number;
  total_comments: number;
  saved: number;
  created_at: string;
  author_id: string;
  username: string;
  avatar: string;
  is_edited?: boolean;
}

const pageSize = 10;

export const getDBFeaturePost = async (numberOfPost: number) => {
  const feature = await postgres.query(
    `
   SELECT p.id, pu.title, pu.content, p.category_id, p.likes, p.total_comments, p.saved, p.created_at, p.author_id, u.username, u.avatar
       FROM public.post p
       INNER JOIN public.user u ON p.author_id = u.id
       INNER JOIN public.post_universal pu ON p.id = pu.post_id
       WHERE lang='vn'
       ORDER BY p.clicked DESC
       LIMIT $1
    `,
    [numberOfPost]
  );

  if (!feature.rowCount) {
    return false;
  }

  return feature.rows;
};

export const getDbPostById = async (postId: number) => {
  let ret = await postgres.query(
    `SELECT 
      p.id, 
      p.category_id, 
      p.likes, 
      p.total_comments, 
      p.saved, 
      p.created_at, 
      p.author_id, 
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

export const getDbListPost = async (
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
    [category, pageSize, pageSize * (page - 1), userId || null]
  );

  console.log(ret);

  if (!ret.rowCount) {
    return false;
  }

  const posts = ret.rows;

  return posts;
};

export const getCategoryInfoById = async (
  category: number,
  userId?: string
) => {
  const ret = await postgres.query(
    `
    SELECT c.total_post, c.name as category_name, p.name as program_name
    FROM public.category c
    INNER JOIN public.program p
    ON c.program_id = p.id
    WHERE c.id = $1
    `,
    [category]
  );

  if (!ret.rowCount) {
    return false;
  }

  const { total_post, category_name, program_name } = ret.rows[0];

  return {
    totalPage: Math.round(total_post / pageSize) as number,
    categoryName: category_name,
    programName: program_name,
  };
};

export const getAllCategoryInfoRepo = async () => {
  const ret = await postgres.query(
    `
    SELECT c.id as category_id, c.name as category_name, p.name as program_name
    FROM public.category c
    INNER JOIN public.program p
    ON c.program_id = p.id
    ORDER BY c.id;
    `
  );

  if (!ret.rowCount) {
    return false;
  }

  const clasify = ret.rows.reduce((acc, cur) => {
    const { category_id, category_name, program_name } = cur;

    if (!acc[program_name]) {
      acc[program_name] = [];
    }

    acc[program_name].push({ name: category_name, id: category_id });

    return acc;
  }, {});

  return clasify;
};

export const modifyDbPost = async (postId, title, content, lang) => {
  const updatePost = await postgres.query(
    `
      UPDATE public.post_universal 
      SET title=$1, content=$2 
      WHERE post_id=$3
      AND lang=$4;
    `,
    [title, content, postId, lang]
  );

  if (!updatePost.rowCount) {
    return false;
  }

  return true;
};

export const getDbPostInfo = async (postId: number) => {
  let ret = await postgres.query(
    `SELECT p.id, p.category_id, p.likes, p.total_comments, p.saved, p.created_at, p.author_id, u.username, u.avatar
    FROM public.post p
    INNER JOIN public.user u ON p.author_id = u.id
    WHERE p.id = $1`,
    [postId]
  );

  if (!ret.rowCount) {
    return false;
  }
  return ret.rows[0] as IPost;
};

export const updateDbPostVote = async (
  votes: number,
  postId: number,
  userId: string
) => {
  try {
    await postgres.query("BEGIN");
    let updateLikeCount = await postgres.query(
      `UPDATE post
       SET likes = likes + $1
       WHERE id = $2;
      `,
      [votes, postId]
    );

    if (votes < 0) {
      let updateLikeRecord = await postgres.query(
        `
        DELETE FROM public.like
        WHERE user_id = $1 AND post_id = $2;
        `,
        [userId, postId]
      );
    } else {
      let updateLikeRecord = await postgres.query(
        `
        INSERT INTO public.like (user_id, post_id)
        VALUES ($1, $2);
        `,
        [userId, postId]
      );
    }

    await postgres.query("COMMIT");
  } catch (e) {
    await postgres.query("ROLLBACK");
    return false;
  }

  return true;
};

export const togglePostDbEdited = async (postId: number) => {
  try {
    const edited = await postgres.query(
      `
    UPDATE post
    SET is_edited = NOT is_edited
    WHERE id = $1;
    `,
      [postId]
    );
  } catch (err) {
    return false;
  }

  return true;
};
