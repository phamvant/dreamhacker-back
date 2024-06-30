import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import CONFIG from "../../config/config.js";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CONFIG.FRONTEND_URL,
    failureRedirect: CONFIG.FRONTEND_URL,
  }),
);

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).send();
  }

  req.logout((err) => {
    if (err) {
      res.redirect(CONFIG.FRONTEND_URL);
      return res.status(400).send();
    }

    res.redirect(CONFIG.FRONTEND_URL);
    res.status(200).send();
  });
});

export default router;
