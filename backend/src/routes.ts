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
import { ScheduleService } from "./services/ScheduleService";
export const scheduleService = new ScheduleService(knex);
import { ScheduleController } from "./controllers/ScheduleController";
export const scheduleController = new ScheduleController(scheduleService);


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
import { scheduleRoutes } from "./routers/scheduleRoutes";
import { editActivitiesRoutes } from "./routers/editActivitiesRoutes";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/home", homeRoutes);
routes.use("/organisation", organisationRoutes);
routes.use("/activity", activityRoutes);
routes.use("/badge", badgeRoutes);
routes.use("/schedule", scheduleRoutes);
routes.use("/editActivities", editActivitiesRoutes)