import { Router } from "express";
import { checkRole } from "../../../middleware/auth.js";
import { asyncHandler } from "../../../utils/async.handler.js";
import { createPostController } from "../../../controller/admin/post.controller.js";
import { createPostSchema } from "../../../schema/schema.post.js";

const postRoute = Router();

postRoute.post(
  "/create",
  checkRole("ADMIN"),
  createPostSchema,
  asyncHandler(createPostController)
);

export default postRoute;
