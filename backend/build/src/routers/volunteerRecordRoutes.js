"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.volunteerRecordRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.volunteerRecordRoutes = (0, express_1.Router)();
exports.volunteerRecordRoutes.get("/", guards_1.isLoggedInAPI, routes_1.volunteerRecordController.getVolunteerHistory);
//# sourceMappingURL=volunteerRecordRoutes.js.map