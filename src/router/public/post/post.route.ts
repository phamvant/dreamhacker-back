import { Router } from "express";
import { asyncHandler } from "../../../utils/async.handler.js";
import {
  decreaseLikeController,
  getFeaturePostController,
  getPostByIdController,
  increaseLikeController,
} from "../../../controller/public/post.controller.js";
import { getPostCommentByIdController } from "../../../controller/public/comment.controller.js";

const router = Router();

router.get("/feature", asyncHandler(getFeaturePostController));

router.get("/:id", asyncHandler(getPostByIdController));

router.get("/:id/comment", asyncHandler(getPostCommentByIdController));

router.post("/:id/vote", asyncHandler(increaseLikeController));

router.delete("/:id/vote", asyncHandler(decreaseLikeController));

export default router;
