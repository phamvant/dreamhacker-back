import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import CONFIG from "../../config/config.js";

const router = Router();

router.get("/login/failed", (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    })
  }
});

router.get("/google",
  passport.authenticate("google", { scope: ["profile"] }))

router.get("/google/callback",
  passport.authenticate("google",
    {
      successRedirect: CONFIG.FRONTEND_URL,
      failureRedirect: "/login/failed",
    }
  )
)

export default router;
