import pg from "pg";
import config from "../config/config.js";

const postgresSingleton = () => {
  return new pg.Pool({
    host: config.DB.HOST,
    port: config.DB.PORT,
    database: config.DB.NAME,
    user: config.DB.USER,
    password: config.DB.PASSWORD,
    query_timeout: 2000,
    ssl: true,
  });
};

declare global {
  var postgres: ReturnType<typeof postgresSingleton>;
}

const postgres = globalThis.postgres ?? postgresSingleton();

postgres.on("error", (err) => {
  console.log("Something bad happened with database!!!", err.stack);
});

export default postgres;

if (process.env.NODE_ENV !== "production") globalThis.postgres = postgres;
