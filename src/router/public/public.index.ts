import { Router } from "express";
import accessRoute from "./user/public.user.route.js";
import postRoute from "./post/post.route.js";

const publicIndexRouteV1 = Router();

publicIndexRouteV1.use("/user", accessRoute);

publicIndexRouteV1.use("/post", postRoute);

export default publicIndexRouteV1;
