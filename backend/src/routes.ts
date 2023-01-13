import { knex } from "./main";

import { UserService } from "./services/UserService";
const userService = new UserService(knex);
import { UserController } from "./controllers/UserController";
export const userController = new UserController(userService);

import { Router } from "express";
import { userRoutes } from "./routers/userRoutes";

export const routes = Router();

routes.use("/user", userRoutes);
