import { knex } from "./main";

import { UserService } from "./services/UserService";
export const userService = new UserService(knex);
import { UserController } from "./controllers/UserController";
export const userController = new UserController(userService);
import { HomeService } from "./services/HomeService";
export const homeService = new HomeService(knex);
import { HomeController } from "./controllers/HomeController";
export const homeController = new HomeController(homeService);

import { Router } from "express";
import { userRoutes } from "./routers/userRoutes";
import { homeRoutes } from "./routers/homeRoutes";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/home", homeRoutes);
