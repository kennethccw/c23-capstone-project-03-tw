import express from "express";
import expressSession from "express-session";
import { logger } from "./utils/logger";
import dotenv from "dotenv";
import cors from "cors";
import Knex from "knex";

const app = express();

dotenv.config();
import knexConfigs from "./knexfile";
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
export const knex = Knex(knexConfig);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL ?? ""],
  })
);
app.use(
  expressSession({
    secret: Math.random().toString(32).slice(2), // 32 base number
    resave: true,
    saveUninitialized: true,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  logger.info(`listening to port ${PORT}`);
  logger.info(`http://localhost:${PORT}`);
});
