import { Router } from "express";

const accessRoute = Router();

accessRoute.get("/:id", (req, res, next) => {
  res.status(200).json({ user: req.params.id });
});

export default accessRoute;
