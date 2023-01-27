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
import { ActivityService } from "./services/ActivityService";
export const activityService = new ActivityService(knex);
import { ActivityController } from "./controllers/ActivityController";
export const activityController = new ActivityController(activityService);
import { BadgeService } from "./services/BadgeService";
export const badgeService = new BadgeService(knex);
import { BadgeController } from "./controllers/BadgeController";
export const badgeController = new BadgeController(badgeService);


/////// for edit activities page ////////////////////
import { EditActivitiesService } from "./services/EditActivitiesService";
export const editActivitiesService= new EditActivitiesService(knex);
import { EditActivitiesController } from "./controllers/EditActivitiesController";
export const editActivitiesController=new 
EditActivitiesController(editActivitiesService)
/////////////////////////////////////////////////////////

import { Router } from "express";
import { userRoutes } from "./routers/userRoutes";
import { homeRoutes } from "./routers/homeRoutes";
import { organisationRoutes } from "./routers/organisationRoutes";
import { activityRoutes } from "./routers/activityRoutes";
import { badgeRoutes } from "./routers/badgeRoutes";
import { isLoggedInAPI } from "./utils/guards";
import { editActivitiesRoutes } from "./routers/editActivitiesRoutes";






export const routes = Router();

routes.use("/user",  userRoutes);
routes.use("/home",isLoggedInAPI, homeRoutes);
routes.use("/organisation",isLoggedInAPI, organisationRoutes);
routes.use("/activity",isLoggedInAPI, activityRoutes);
routes.use("/badge",isLoggedInAPI, badgeRoutes);
routes.use("/editActivities",isLoggedInAPI, editActivitiesRoutes)