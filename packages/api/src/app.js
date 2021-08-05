import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./errors.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();

app.use(cors());
app.use(express.json());

// routes

app.use(notFound);
app.use(errorHandler);

export default app;
