import CONFIG from "./config/config.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import cookieSession from "cookie-session";
import publicApp from "./public.js";
import adminApp from "./admin.js";
import authRoute from "./routes/auth/index.js";
import myPassport from "./middleware/passport.js";

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

// For fixing library bug
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb: any) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb: any) => {
      cb();
    };
  }
  next();
});

// This sets req._passport
app.use(myPassport.initialize());

// Read session from request and assign to request object
app.use(myPassport.session());

app.use(
  cors({
    origin: CONFIG.FRONTEND_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }),
);

app.use("/auth/", authRoute);
app.use(adminApp);
app.use(publicApp);

// TODO setup product

const server = app.listen(CONFIG.APP.PORT, () => {
  console.log(`Listening on port ${CONFIG.APP.PORT}...`);
});
