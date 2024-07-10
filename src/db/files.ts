import fs from "fs/promises";
import path from "path";
import { cwd } from "process";

export const getPostFromPath = async (link: string) => {
  try {
    console.log(path.join(cwd(), "contents", link));
    const contentBuf = await fs.readFile(path.join(cwd(), "contents", link));
    return contentBuf;
  } catch (error) {
    return false;
  }
};
