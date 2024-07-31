import { Router } from "express";
import {
  getListPostController,
  getAllCategoryInfoController,
} from "../../../controller/public/category.controller.js";
import { asyncHandler } from "../../../utils/async.handler.js";

const router = Router();

router.get("/", asyncHandler(getListPostController));

router.get("/info", asyncHandler(getAllCategoryInfoController));

export default router;
