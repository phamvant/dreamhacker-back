import { Response, Router } from "express";
import accessRoute from "./user/public.user.route.js";
import postRoute from "./post/post.route.js";
import { SUCCESS } from "../../utils/success.response.js";
import { asyncHandler } from "../../utils/async.handler.js";

const publicIndexRouteV1 = Router();

publicIndexRouteV1.use("/user", accessRoute);

publicIndexRouteV1.use("/post", postRoute);

export default publicIndexRouteV1;
