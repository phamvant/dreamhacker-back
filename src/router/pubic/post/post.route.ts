import { Router } from "express";
import { asyncHandler } from "../../../utils/async.handler.js";
import {
  createPostController,
  getListPostController,
  getPostByIdController,
} from "../../../controller/public/post.controller.js";
import { ensureAuthenticated } from "../../../middleware/auth.js";

const router = Router();

router.get("/list", asyncHandler(getListPostController));

router.get("/:id", asyncHandler(getPostByIdController));

router.post("/create", ensureAuthenticated, asyncHandler(createPostController));

export default router;
