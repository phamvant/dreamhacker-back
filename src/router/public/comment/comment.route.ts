import { Router } from "express";
import { asyncHandler } from "../../../utils/async.handler.js";
import { commentPostController } from "../../../controller/public/comment.controller.js";

const router = Router();

router.post("/", asyncHandler(commentPostController));

export default router;
