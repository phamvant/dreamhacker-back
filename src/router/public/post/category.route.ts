import { Router } from "express";
import { getListPostController } from "../../../controller/public/post.controller";
import { asyncHandler } from "../../../utils/async.handler";
import { getAllCategoryInfo } from "../../../service/public/post/post.service";
import { getAllCategoryInfoController } from "../../../controller/public/category.controller";

const router = Router();

router.get("/", asyncHandler(getListPostController));

router.get("/info", asyncHandler(getAllCategoryInfoController));

export default router;
