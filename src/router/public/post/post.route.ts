import { Router } from "express";
import { asyncHandler } from "../../../utils/async.handler.js";
import {
  getFeaturePostController,
  getListPostController,
  getPostByIdController,
} from "../../../controller/public/post.controller.js";

const router = Router();

router.get("/feature", asyncHandler(getFeaturePostController));

router.get("/:id", asyncHandler(getPostByIdController));

export default router;
