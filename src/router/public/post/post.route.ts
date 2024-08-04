import { Router } from "express";
import { asyncHandler } from "../../../utils/async.handler.js";
import {
  getFeaturePostController,
  getPostByIdController,
} from "../../../controller/public/post.controller.js";
import { getPostCommentByIdController } from "../../../controller/public/comment.controller.js";

const router = Router();

router.get("/feature", asyncHandler(getFeaturePostController));

router.get("/:id", asyncHandler(getPostByIdController));

router.get("/:id/comment", asyncHandler(getPostCommentByIdController));

export default router;
