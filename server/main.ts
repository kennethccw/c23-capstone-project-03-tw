import express from "express";
import expressSession from "express-session";
import { logger } from "./utils/logger";

const app = express();

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
