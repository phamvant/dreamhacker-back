import { Router } from "express";
import accessRoute from "./user/public.user.route.js";
import categoryRoute from "./post/category.route.js";
import postRoute from "./post/post.route.js";
import commentRoute from "./comment/comment.route.js";

const publicIndexRouteV1 = Router();

publicIndexRouteV1.use("/user", accessRoute);

publicIndexRouteV1.use("/category", categoryRoute);

publicIndexRouteV1.use("/post", postRoute);

publicIndexRouteV1.use("/comment", commentRoute);

export default publicIndexRouteV1;
