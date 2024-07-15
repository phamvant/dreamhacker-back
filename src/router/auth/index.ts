import { Router } from "express";
import passport from "passport";
import CONFIG from "../../config/config.js";
import { asyncHandler } from "../../utils/async.handler.js";
import { logoutController } from "../../controller/auth/auth.controller.js";
import { SUCCESS } from "../../utils/success.response.js";
import { checkRole } from "../../middleware/auth.js";

const router = Router();

router.get(
  "",
  checkRole(),
  asyncHandler(async (req, res, next) => {
    const { role } = res.locals;
    new SUCCESS({ metadata: { role: role } }).send(res);
  })
);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CONFIG.FRONTEND_URL,
    failureRedirect: CONFIG.FRONTEND_URL,
  })
);

router.get("/logout", asyncHandler(logoutController));

export default router;
