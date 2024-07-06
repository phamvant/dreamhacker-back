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
import { ErrorResponse, NotFoundError } from "./utils/error.response.js";
import { StatusCode } from "./utils/http.response/code.status.js";

const app = express();

app.use(helmet());
app.use(morgan("short"));

app.get("/", async () => {
  const db = await postgres.query(`select * from session`);
  console.log(db.rows[0]);
});

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
  }),
);

app.use(csrf());

app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(express.json()); // parse incoming request with JSON payload

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

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error = new NotFoundError({ message: "Not found" });
    next(error);
  },
);

app.use(
  (
    error: ErrorResponse,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log("Error", error);
    res
      .status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: error.message })
      .send();
  },
);

const server = app.listen(CONFIG.APP.PORT, () => {
  console.log(`Listening on port ${CONFIG.APP.PORT}...`);
});
