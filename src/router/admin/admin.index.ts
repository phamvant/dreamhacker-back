import { Router } from "express";
import accessRoute from "./user/user.route.js";
import postRoute from "./post/post.route.js";

const adminIndexRoute = Router();

adminIndexRoute.use("/", accessRoute);

adminIndexRoute.use("/post", postRoute);

export default adminIndexRoute;
