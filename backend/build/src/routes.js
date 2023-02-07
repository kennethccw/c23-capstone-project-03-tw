"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = exports.fileS3 = exports.editAnimalsController = exports.editAnimalsService = exports.editActivitiesController = exports.editActivitiesService = exports.approvalActivityController = exports.approvalActivityService = exports.volunteerRecordController = exports.volunteerRecordService = exports.helpController = exports.helpService = exports.donationController = exports.donationService = exports.scheduleController = exports.scheduleService = exports.badgeController = exports.badgeService = exports.adoptionController = exports.adoptionService = exports.activityController = exports.activityService = exports.organisationController = exports.organisationService = exports.homeController = exports.homeService = exports.userController = exports.userService = void 0;
var main_1 = require("../main");
var UserService_1 = require("./services/UserService");
exports.userService = new UserService_1.UserService(main_1.knex);
var UserController_1 = require("./controllers/UserController");
exports.userController = new UserController_1.UserController(exports.userService);
var HomeService_1 = require("./services/HomeService");
exports.homeService = new HomeService_1.HomeService(main_1.knex);
var HomeController_1 = require("./controllers/HomeController");
exports.homeController = new HomeController_1.HomeController(exports.homeService);
var OrganisationService_1 = require("./services/OrganisationService");
exports.organisationService = new OrganisationService_1.OrganisationService(main_1.knex);
var OrganisationController_1 = require("./controllers/OrganisationController");
exports.organisationController = new OrganisationController_1.OrganisationController(exports.organisationService);
var ActivityService_1 = require("./services/ActivityService");
exports.activityService = new ActivityService_1.ActivityService(main_1.knex);
var ActivityController_1 = require("./controllers/ActivityController");
exports.activityController = new ActivityController_1.ActivityController(exports.activityService);
var AdoptionService_1 = require("./services/AdoptionService");
exports.adoptionService = new AdoptionService_1.AdoptionService(main_1.knex);
var AdoptionController_1 = require("./controllers/AdoptionController");
exports.adoptionController = new AdoptionController_1.AdoptionController(exports.adoptionService);
var BadgeService_1 = require("./services/BadgeService");
exports.badgeService = new BadgeService_1.BadgeService(main_1.knex);
var BadgeController_1 = require("./controllers/BadgeController");
exports.badgeController = new BadgeController_1.BadgeController(exports.badgeService);
var ScheduleService_1 = require("./services/ScheduleService");
exports.scheduleService = new ScheduleService_1.ScheduleService(main_1.knex);
var ScheduleController_1 = require("./controllers/ScheduleController");
exports.scheduleController = new ScheduleController_1.ScheduleController(exports.scheduleService);
var DonationService_1 = require("./services/DonationService");
exports.donationService = new DonationService_1.DonationService(main_1.knex);
var DonationController_1 = require("./controllers/DonationController");
exports.donationController = new DonationController_1.DonationController(exports.donationService);
var HelpService_1 = require("./services/HelpService");
exports.helpService = new HelpService_1.HelpService(main_1.knex);
var HelpController_1 = require("./controllers/HelpController");
exports.helpController = new HelpController_1.HelpController(exports.helpService);
var VolunteerRecordService_1 = require("./services/VolunteerRecordService");
exports.volunteerRecordService = new VolunteerRecordService_1.VolunteerRecordService(main_1.knex);
var VolunteerRecordController_1 = require("./controllers/VolunteerRecordController");
exports.volunteerRecordController = new VolunteerRecordController_1.VolunteerRecordController(exports.volunteerRecordService);
var ApprovalActivityService_1 = require("./services/ApprovalActivityService");
exports.approvalActivityService = new ApprovalActivityService_1.ApprovalActivityService(main_1.knex);
var ApprovalActivityController_1 = require("./controllers/ApprovalActivityController");
exports.approvalActivityController = new ApprovalActivityController_1.ApprovalActivityController(exports.approvalActivityService);
/////// for edit activities and animals page ////////////////////
var EditActivitiesService_1 = require("./services/EditActivitiesService");
exports.editActivitiesService = new EditActivitiesService_1.EditActivitiesService(main_1.knex);
var EditActivitiesController_1 = require("./controllers/EditActivitiesController");
exports.editActivitiesController = new EditActivitiesController_1.EditActivitiesController(exports.editActivitiesService);
var EditAnimalsService_1 = require("./services/EditAnimalsService");
exports.editAnimalsService = new EditAnimalsService_1.EditAnimalsService(main_1.knex);
var EditAnimalsController_1 = require("./controllers/EditAnimalsController");
exports.editAnimalsController = new EditAnimalsController_1.EditAnimalsController(exports.editAnimalsService);
/////////////////////////////////////////////////////////
var formidableS3_1 = require("./utils/formidableS3");
exports.fileS3 = new formidableS3_1.FileS3Controller();
var express_1 = require("express");
var userRoutes_1 = require("./routers/userRoutes");
var homeRoutes_1 = require("./routers/homeRoutes");
var organisationRoutes_1 = require("./routers/organisationRoutes");
var activityRoutes_1 = require("./routers/activityRoutes");
var badgeRoutes_1 = require("./routers/badgeRoutes");
var scheduleRoutes_1 = require("./routers/scheduleRoutes");
var editActivitiesRoutes_1 = require("./routers/editActivitiesRoutes");
var donationRoutes_1 = require("./routers/donationRoutes");
var adoptionRoutes_1 = require("./routers/adoptionRoutes");
var helpRoutes_1 = require("./routers/helpRoutes");
var editAnimalsRoutes_1 = require("./routers/editAnimalsRoutes");
var volunteerRecordRoutes_1 = require("./routers/volunteerRecordRoutes");
var approvalActivityRoutes_1 = require("./routers/approvalActivityRoutes");
exports.routes = (0, express_1.Router)();
exports.routes.use("/user", userRoutes_1.userRoutes);
exports.routes.use("/home", homeRoutes_1.homeRoutes);
exports.routes.use("/organisation", organisationRoutes_1.organisationRoutes);
exports.routes.use("/activity", activityRoutes_1.activityRoutes);
exports.routes.use("/badge", badgeRoutes_1.badgeRoutes);
exports.routes.use("/schedule", scheduleRoutes_1.scheduleRoutes);
exports.routes.use("/editActivities", editActivitiesRoutes_1.editActivitiesRoutes);
exports.routes.use("/donation", donationRoutes_1.donationRoutes);
exports.routes.use("/adoption", adoptionRoutes_1.adoptionRoutes);
exports.routes.use("/help", helpRoutes_1.helpRoutes);
exports.routes.use("/editAnimals", editAnimalsRoutes_1.editAnimalsRoutes);
exports.routes.use("/record", volunteerRecordRoutes_1.volunteerRecordRoutes);
exports.routes.use("/activity/approval", approvalActivityRoutes_1.approvalActivityRoutes);
//# sourceMappingURL=routes.js.map