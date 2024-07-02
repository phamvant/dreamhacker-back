import { Router } from "express";
import { asyncHandler } from "../../../utils/async.handler.js";
import {
  getListPostController,
  getPostByIdController,
} from "../../../controller/public/post.controller.js";

const router = Router();

router.get("/list", asyncHandler(getListPostController));

router.get("/:id", asyncHandler(getPostByIdController));

export default router;
