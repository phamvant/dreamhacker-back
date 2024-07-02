import CONFIG from "./config/config.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import csrf from "csurf";

import publicApp from "./public.js";
import adminApp from "./admin.js";
import authRoute from "./route/auth/index.js";
import myPassport from "./middleware/passport.js";
import session from "express-session";
import pgSession from "connect-pg-simple";
import postgres from "./db/db.js";

const app = express();

app.use(helmet());
app.use(morgan("short"));

const pgStore = pgSession(session);

app.use(
  session({
    secret: "thuan",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: new pgStore({
      pool: postgres,
    }),
  })
);

app.use(csrf());

app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
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
  })
);

app.use("/auth/", authRoute);
app.use(adminApp);
app.use(publicApp);

// TODO setup product

const server = app.listen(CONFIG.APP.PORT, () => {
  console.log(`Listening on port ${CONFIG.APP.PORT}...`);
});
