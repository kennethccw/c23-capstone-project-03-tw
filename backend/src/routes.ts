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

import { AdoptionService } from "./services/AdoptionService";
export const adoptionService = new AdoptionService(knex);
import { AdoptionController } from "./controllers/AdoptionController";
export const adoptionController = new AdoptionController(adoptionService);

import { BadgeService } from "./services/BadgeService";
export const badgeService = new BadgeService(knex);
import { BadgeController } from "./controllers/BadgeController";
export const badgeController = new BadgeController(badgeService);

import { ScheduleService } from "./services/ScheduleService";
export const scheduleService = new ScheduleService(knex);
import { ScheduleController } from "./controllers/ScheduleController";
export const scheduleController = new ScheduleController(scheduleService);
import { DonationService } from "./services/DonationService";
export const donationService = new DonationService(knex);
import { DonationController } from "./controllers/DonationController";
export const donationController = new DonationController(donationService);
import { HelpService } from "./services/HelpService";
export const helpService = new HelpService(knex);
import { HelpController } from "./controllers/HelpController";
export const helpController = new HelpController(helpService);

/////// for edit activities and animals page ////////////////////
import { EditActivitiesService } from "./services/EditActivitiesService";
export const editActivitiesService = new EditActivitiesService(knex);
import { EditActivitiesController } from "./controllers/EditActivitiesController";
export const editActivitiesController = new EditActivitiesController(editActivitiesService);
// import { EditAnimalsService } from "./services/EditAnimalsService";
// export const editAnimalsService = new EditAnimalsService(knex);
import { EditAnimalsController } from "./controllers/EditAnimalsController";
export const editAnimalsController = new EditAnimalsController(EditAnimalsController);
/////////////////////////////////////////////////////////

import { Router } from "express";
import { userRoutes } from "./routers/userRoutes";
import { homeRoutes } from "./routers/homeRoutes";
import { organisationRoutes } from "./routers/organisationRoutes";
import { activityRoutes } from "./routers/activityRoutes";
import { badgeRoutes } from "./routers/badgeRoutes";
import { scheduleRoutes } from "./routers/scheduleRoutes";
import { editActivitiesRoutes } from "./routers/editActivitiesRoutes";
import { donationRoutes } from "./routers/donationRoutes";
import { adoptionRoutes } from "./routers/adoptionRoutes";
import { helpRoutes } from "./routers/helpRoutes";
import { editAnimalsRoutes } from "./routers/editAnimalsRoutes";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/home", homeRoutes);
routes.use("/organisation", organisationRoutes);
routes.use("/activity", activityRoutes);
routes.use("/badge", badgeRoutes);
routes.use("/schedule", scheduleRoutes);
routes.use("/editActivities", editActivitiesRoutes);
routes.use("/donation", donationRoutes);
routes.use("/adoption", adoptionRoutes);
routes.use("/help", helpRoutes);
routes.use("/editAnimals", editAnimalsRoutes);
