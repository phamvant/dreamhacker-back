import { Router } from "express";
import { checkRole } from "../../../middleware/auth.js";
import { asyncHandler } from "../../../utils/async.handler.js";
import { createPostController } from "../../../controller/admin/post.controller.js";

const router = Router();

router.post("/create", checkRole("ADMIN"), asyncHandler(createPostController));
