import { Router } from "express";
import passport from "passport";
import CONFIG from "../../config/config.js";
import { asyncHandler } from "../../utils/async.handler.js";
import { logoutController } from "../../controller/auth/auth.controller.js";
import { ensureAuthenticated } from "../../middleware/auth.js";
import { SUCCESS } from "../../utils/success.response.js";

const router = Router();

router.get(
  "/",
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    new SUCCESS().send(res);
  }),
);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${CONFIG.FRONTEND_URL}/login`,
    failureRedirect: CONFIG.FRONTEND_URL,
  }),
);

router.get("/logout", asyncHandler(logoutController));

export default router;
