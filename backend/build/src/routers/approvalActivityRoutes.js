"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvalActivityRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.approvalActivityRoutes = (0, express_1.Router)();
exports.approvalActivityRoutes.get("/pending", guards_1.isLoggedInAPI, routes_1.approvalActivityController.getPendingApplication);
exports.approvalActivityRoutes.put("/pending", guards_1.isLoggedInAPI, routes_1.approvalActivityController.putPendingApplication);
exports.approvalActivityRoutes.get("/alreadyApproved", guards_1.isLoggedInAPI, routes_1.approvalActivityController.getApprovedApplication);
//# sourceMappingURL=approvalActivityRoutes.js.map