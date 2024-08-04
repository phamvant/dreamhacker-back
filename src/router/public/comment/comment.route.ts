import { Router } from "express";
import { asyncHandler } from "../../../utils/async.handler.js";
import { commentPostController } from "../../../controller/public/comment.controller.js";
import { checkRole } from "../../../middleware/auth.js";

const router = Router();

router.post("/", checkRole(), asyncHandler(commentPostController));

export default router;
