"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.badgeRoutes = (0, express_1.Router)();
exports.badgeRoutes.get("/", guards_1.isLoggedInAPI, routes_1.badgeController.getBadges);
//# sourceMappingURL=badgeRoutes.js.map