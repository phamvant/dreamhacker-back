import { Router } from "express";
import postRoute from "./post/post.route.js";
import categoryRoute from "./category/category.route.js";

const adminIndexRoute = Router();

adminIndexRoute.use("/post", postRoute);

adminIndexRoute.use("/category", categoryRoute);

export default adminIndexRoute;
