import express from "express";
import publicIndexRouteV1 from "./router/public/public.index.js";

const publicApp = express();

/**
 * Middle ware
 */

// DOC_EXPRESS
// Can use to serve static file like API document with Swagger, assets for a CMS
// publicApp.use("/docs", express.static(path.join(__dirname, "docs")));
// For best results, use a reverse proxy cache to improve performance of serving static assets.

// DOC_EXPRESS
// often used to parse application/x-www-form-urlencoded
// express.urlencoded

// TOLEARN multer

/**
 * Routing
 */

// publicApp.use(asyncHandler(checkRole));

publicApp.use("/api/v1", publicIndexRouteV1);

export default publicApp;
