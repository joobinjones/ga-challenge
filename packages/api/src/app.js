import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { notFound, errorHandler, methodNotAllowed } from "./errors.js";
import { fileURLToPath } from "url";
import db from "./db/connection.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const getGameData = async (req, res, next) => {
  res.json({ data: await db("game") });
};

const app = express();
app.use(cors());
app.use(express.json());
app.route("/").get(getGameData).all(methodNotAllowed);
app.use(notFound);
app.use(errorHandler);

export default app;
