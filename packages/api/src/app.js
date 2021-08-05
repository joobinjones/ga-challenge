import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./errors";
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();

app.use(cors());
app.use(express.json());

// routes

app.use(notFound);
app.use(errorHandler);

export default app;
