import { Router } from "express";
import passport from "passport";
import CONFIG from "../../config/config.js";
import { asyncHandler } from "../../utils/async.handler.js";
import { logoutController } from "../../controller/auth/auth.controller.js";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CONFIG.FRONTEND_URL,
    failureRedirect: CONFIG.FRONTEND_URL,
  }),
);

router.get("/logout", asyncHandler(logoutController));

export default router;
