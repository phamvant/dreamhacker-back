import { Router } from "express";
import { checkRole } from "../../../middleware/auth.js";
import { asyncHandler } from "../../../utils/async.handler.js";
import {
  createPostController,
  modifyPostController,
} from "../../../controller/admin/post.controller.js";
import { createPostSchema } from "../../../schema/schema.post.js";

const postRoute = Router();

postRoute.post(
  "/",
  checkRole("ADMIN"),
  createPostSchema,
  asyncHandler(createPostController)
);

postRoute.put("/:id", checkRole("ADMIN"), asyncHandler(modifyPostController));

export default postRoute;
