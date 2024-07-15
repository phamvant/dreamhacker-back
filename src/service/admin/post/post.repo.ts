import { save } from "./post.service.js";

export const savePost = async (
  title: string,
  content: string,
  userId: string,
) => {
  const ret = await save(title, content, userId);

  return ret;
};
