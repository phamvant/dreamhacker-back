import { Router } from "express";
import accessRoute from "./user/admin.user.route.js";

const adminIndexRoute = Router();

adminIndexRoute.get("/", async (req, res, next) => {
  res.status(200).json({ Hello: "Admin" });
});

adminIndexRoute.use("/", accessRoute);

export default adminIndexRoute;
