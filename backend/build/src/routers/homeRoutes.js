"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.homeRoutes = (0, express_1.Router)();
exports.homeRoutes.get("/activity", guards_1.isLoggedInAPI, routes_1.homeController.getHomeActivities);
exports.homeRoutes.get("/notification", guards_1.isLoggedInAPI, routes_1.homeController.getNotification);
exports.homeRoutes.delete("/notification", guards_1.isLoggedInAPI, routes_1.homeController.deleteNotification);
exports.homeRoutes.get("/advertiser", guards_1.isLoggedInAPI, routes_1.homeController.getHomeAdvertisers);
exports.homeRoutes.post("/advertiser", guards_1.isLoggedInAPI, routes_1.homeController.postHomeAdvertiser);
//# sourceMappingURL=homeRoutes.js.map