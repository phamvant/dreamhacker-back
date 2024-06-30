import fs from "fs/promises";
import path from "path";
import { cwd } from "process";

export const getPostFromPath = async (link: string) => {
  const contentBuf = await fs.readFile(path.join(cwd(), "contents", link));
  return contentBuf;
};
