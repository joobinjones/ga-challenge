import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {
  DATABASE_URL = "postgres://uefefukn:aCvWFJ-jS-pMUNmWt_cUTmosnrkL9QVL@chunee.db.elephantsql.com/uefefukn",
  DEBUG,
} = process.env;

export default {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
