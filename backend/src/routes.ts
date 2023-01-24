import { knex } from "./main";

import { UserService } from "./services/UserService";
export const userService = new UserService(knex);
import { UserController } from "./controllers/UserController";
export const userController = new UserController(userService);
import { HomeService } from "./services/HomeService";
export const homeService = new HomeService(knex);
import { HomeController } from "./controllers/HomeController";
export const homeController = new HomeController(homeService);
import { OrganisationService } from "./services/OrganisationService";
export const organisationService = new OrganisationService(knex);
import { OrganisationController } from "./controllers/OrganisationController";
export const organisationController = new OrganisationController(organisationService);

import { Router } from "express";
import { userRoutes } from "./routers/userRoutes";
import { homeRoutes } from "./routers/homeRoutes";
import { organisationRoutes } from "./routers/organisationRoutes";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/home", homeRoutes);
routes.use("/organisation", organisationRoutes);
