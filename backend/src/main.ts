import express from "express";
import expressSession from "express-session";
import { logger } from "./utils/logger";
import dotenv from "dotenv";
import cors from "cors";
import Knex from "knex";
import http from "http";
import { Server as SocketIO } from "socket.io";

const app = express();

const server = new http.Server(app);
export const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

dotenv.config();
import knexConfigs from "../knexfile";
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
export const knex = Knex(knexConfig);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL ?? ""],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

import bodyParser from "body-parser";
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(
  expressSession({
    secret: Math.random().toString(32).slice(2), // 32 base number
    resave: true,
    saveUninitialized: true,
  })
);
declare module "express-session" {
  interface Session {
    user?: { id: number; username: string };
  }
}
import grant from "grant";
const grantExpress = grant.express({
  defaults: {
    origin: "http://localhost:8080",
    transport: "session",
    state: true,
  },
  google: {
    key: process.env.GOOGLE_CLIENT_ID || "",
    secret: process.env.GOOGLE_CLIENT_SECRET || "",
    scope: ["profile", "email"],
    callback: "/user/login/google",
  },
});

io.on("connection", function (socket) {
  // console.log(socket.id);
  socket.on("send-message", (data) => {
    // console.log(data);
    socket.emit("new-message", `received your msg: ${data}`);
  });
});

app.use(grantExpress as express.RequestHandler);

import { routes } from "./routes";
app.use(routes);

const PORT = 8080;
server.listen(PORT, () => {
  logger.info(`listening to port ${PORT}`);
  logger.info(`http://localhost:${PORT}`);
});
