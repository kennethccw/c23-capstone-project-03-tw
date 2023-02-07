"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editActivitiesRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
// import { uploadMiddlewareForActivities } from "../utils/formidableForActivities";
var guards_1 = require("../utils/guards");
exports.editActivitiesRoutes = (0, express_1.Router)();
// editActivitiesRoutes.post(
//   "/addActivities",
//   isLoggedInAPI,
//   uploadMiddlewareForActivities,
//   editActivitiesController.addActivities
// );
exports.editActivitiesRoutes.post("/addActivities", guards_1.isLoggedInAPI, routes_1.fileS3.upload("/photos/activities"), routes_1.editActivitiesController.addActivities);
exports.editActivitiesRoutes.post("/deleteActivities", guards_1.isLoggedInAPI, routes_1.editActivitiesController.deleteActivities);
exports.editActivitiesRoutes.get("/getActivities/:organisationID", guards_1.isLoggedInAPI, routes_1.editActivitiesController.getActivities);
//# sourceMappingURL=editActivitiesRoutes.js.map