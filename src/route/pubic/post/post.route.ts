import { Router, Request, Response, NextFunction } from "express";
import { getPostById } from "../../../service/post/post.service.js";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const postHTML = await getPostById(Number(id));
  res.write(postHTML);
  res.status(200).send();
});

export default router;
