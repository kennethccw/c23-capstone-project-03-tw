"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.donationRoutes = (0, express_1.Router)();
exports.donationRoutes.put("/", guards_1.isLoggedInAPI, routes_1.donationController.putDonationSubmition);
exports.donationRoutes.post("/", guards_1.isLoggedInAPI, routes_1.donationController.postDonationRender);
//# sourceMappingURL=donationRoutes.js.map