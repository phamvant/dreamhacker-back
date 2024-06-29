import { Router } from "express";
import postgres from "../../../db/db.js";

const accessRoute = Router();

accessRoute.get("/:id", async (req, res, next) => {
  res.status(200).json({ admin: req.params.id });
});

export default accessRoute;
