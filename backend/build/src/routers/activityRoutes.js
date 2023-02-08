"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.activityRoutes = (0, express_1.Router)();
exports.activityRoutes.get("/", routes_1.activityController.getAllActivities);
exports.activityRoutes.get("/detail", routes_1.activityController.getActivityDetail);
exports.activityRoutes.get("/category", routes_1.activityController.getActivitiesByCategory);
exports.activityRoutes.post("/application", guards_1.isLoggedInAPI, routes_1.activityController.postActivityApplication);
exports.activityRoutes.put("/application", guards_1.isLoggedInAPI, routes_1.activityController.putActivityApplication);
//# sourceMappingURL=activityRoutes.js.map