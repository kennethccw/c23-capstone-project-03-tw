"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.scheduleRoutes = (0, express_1.Router)();
exports.scheduleRoutes.get("/", guards_1.isLoggedInAPI, routes_1.scheduleController.getScheduleActivities);
//# sourceMappingURL=scheduleRoutes.js.map