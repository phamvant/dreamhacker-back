import { BadRequestError } from "../../../utils/error.response.js";
import { saveDbPost } from "./post.service.js";

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
