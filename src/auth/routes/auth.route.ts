import { Router } from "express";
import passport from "passport";
import CONFIG from "../../config/config.js";
import { asyncHandler } from "../../utils/async.handler.js";
import { logoutController } from "../controller/auth.controller.js";
import { SUCCESS } from "../../utils/success.response.js";
import { checkRole } from "../../middleware/auth.js";

const router = Router();

router.get(
  "",
  checkRole(),
  asyncHandler(async (req, res, next) => {
    const { role, avatar } = res.locals;
    new SUCCESS({ metadata: { role: role, avatar: avatar } }).send(res);
  })
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CONFIG.FRONTEND_URL,
    failureRedirect: CONFIG.FRONTEND_URL,
  })
);

router.get("/logout", asyncHandler(logoutController));

export default router;
