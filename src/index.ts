import CONFIG from "./config/config.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import cookieSession from "cookie-session";
import passport from "passport";

import publicApp from "./public.js";
import adminApp from "./admin.js";
import authRoute from "./routes/auth/index.js"

const app = express();

app.use(helmet());
app.use(morgan("short"));

app.use(
  cookieSession({
    name: "session",
    keys: ["dreamhacker"],
    maxAge: 24 * 60 * 60 * 100,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: CONFIG.FRONTEND_URL,
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}));

app.use(authRoute);
app.use(adminApp);
app.use(publicApp);

// TODO setup product

const server = app.listen(CONFIG.APP.PORT, () => {
  console.log(`Listening on port ${CONFIG.APP.PORT}...`);
});
