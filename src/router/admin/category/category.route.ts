import { Router } from "express";
import { checkRole } from "../../../middleware/auth.js";
import { asyncHandler } from "../../../utils/async.handler.js";
import { getListPostAdminController } from "../../../controller/admin/category.controller.js";

const categoryRoute = Router();

categoryRoute.get(
  "/",
  checkRole("ADMIN"),
  asyncHandler(getListPostAdminController)
);

export default categoryRoute;
