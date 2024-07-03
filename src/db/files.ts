import fs from "fs/promises";
import path from "path";
import { cwd } from "process";
import { NotFoundError } from "../utils/error.response.js";

export const getPostFromPath = async (link: string) => {
  try {
    const contentBuf = await fs.readFile(path.join(cwd(), "contents", link));
    return contentBuf;
  } catch (error) {
    return false;
  }
};
