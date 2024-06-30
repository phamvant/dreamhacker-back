import express from "express";
import adminIndexRoute from "./route/admin/admin.index.js";

const adminApp = express();

/**
 * Middle ware
 */
adminApp.use(express.json()); // parse incoming request with JSON payload

// DOC_EXPRESS
// Can use to serve static file like API document with Swagger, assets for a CMS
// adminApp.use("/docs", express.static(path.join(__dirname, "docs")));
// For best results, use a reverse proxy cache to improve performance of serving static assets.

// DOC_EXPRESS
// often used to parse application/x-www-form-urlencoded
// express.urlencoded

// TOLEARN multer

/**
 * Routing
 */

adminApp.use("/admin", adminIndexRoute);

export default adminApp;
