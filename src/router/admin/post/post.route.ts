import { Router } from "express";
import { checkRole } from "../../../middleware/auth.js";
import { asyncHandler } from "../../../utils/async.handler.js";
import {
  createPostController,
  getPostByIdControllerAdmin,
  modifyPostController,
  togglePostEditedController,
} from "../../../controller/admin/post.controller.js";
import { createPostSchema } from "../../../schema/schema.post.js";

const postRoute = Router();

postRoute.get(
  "/:id",
  checkRole("ADMIN"),
  asyncHandler(getPostByIdControllerAdmin)
);

postRoute.post(
  "/",
  checkRole("ADMIN"),
  createPostSchema,
  asyncHandler(createPostController)
);

postRoute.put("/:id", checkRole("ADMIN"), asyncHandler(modifyPostController));

postRoute.put(
  "/edited/:id",
  checkRole("ADMIN"),
  asyncHandler(togglePostEditedController)
);

export default postRoute;
