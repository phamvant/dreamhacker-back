import { Router, Request, Response, NextFunction } from "express";
import {
  getListPostByCategory,
  getPostById,
} from "../../../service/post/post.service.js";

const router = Router();

router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  const categoryId = parseInt(req.query.category as string);
  const page = parseInt(req.query.page as string);

  console.log(categoryId, page);

  if (!categoryId || !page) {
    res.status(400).send();
  }

  const ret = await getListPostByCategory(categoryId, page);

  if (!ret) {
    res.status(400).send();
  }

  res.status(200).send(ret);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const postHTML = await getPostById(Number(id));
  res.write(postHTML);
  res.status(200).send();
});

export default router;
