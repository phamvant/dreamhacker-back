import CONFIG from "./config/config.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
// import csrf from "csurf";
import sslRootCAs from "ssl-root-cas";
import publicApp from "./public.js";
import adminApp from "./admin.js";
import authRoute from "./auth/routes/auth.route.js";
import myPassport from "./middleware/passport.js";
import session from "express-session";
import pgSession from "connect-pg-simple";
import postgres from "./db/db.js";
import { ErrorResponse, NotFoundError } from "./utils/error.response.js";
import { StatusCode } from "./utils/http.response/code.status.js";

sslRootCAs.inject();
const app = express();

app.use(helmet());
app.use(morgan("dev"));

app.use(
  cors({
    origin:
      CONFIG.ENV === "production" ? ["https://app.dreamhacker.online"] : true,
    credentials: true,
  })
);

const pgStore = pgSession(session);

app.set("trust proxy", 1);

app.use(
  session({
    secret: "kalhlnlswv4uatsco4wtoqpt49tow3uon",
    saveUninitialized: false,
    resave: false,
    cookie: {
      path: "/",
      domain: CONFIG.ENV === "production" ? "dreamhacker.online" : "localhost",
      sameSite: CONFIG.ENV === "production" ? "none" : "lax",
      secure: CONFIG.ENV === "production" ? true : false,
      maxAge: 60000 * 60 * 24,
      httpOnly: true,
    },
    store: new pgStore({
      pool: postgres,
    }),
  })
);

// app.use(csrf());

// app.use(function (req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

app.use(express.json()); // parse incoming request with JSON payload

// This sets req._passport
app.use(myPassport.initialize());

// Read session from request and assign to request object
app.use(myPassport.session());

app.use("/auth/", authRoute);

app.use(adminApp);
app.use(publicApp);

// TODO setup product

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error = new NotFoundError({ message: "Not found" });
    next(error);
  }
);

app.use(
  (
    error: ErrorResponse,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(error);
    res
      .status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: error.message })
      .send();
  }
);

const server = app.listen(CONFIG.APP.PORT, () => {
  console.log(`Listening on port ${CONFIG.APP.PORT}...`);
});
