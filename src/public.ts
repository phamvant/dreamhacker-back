import express from "express";
import publicIndexRouteV1 from "./routes/pubic/public.index.js";

const publicApp = express();

/**
 * Middle ware
 */
publicApp.use(express.json()); // parse incoming request with JSON payload

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

publicApp.use("/api/v1", publicIndexRouteV1);

export default publicApp;
