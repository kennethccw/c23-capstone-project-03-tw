"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organisationRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
exports.organisationRoutes = (0, express_1.Router)();
exports.organisationRoutes.get("/list", routes_1.organisationController.getOrganisationList);
exports.organisationRoutes.get("/detail", routes_1.organisationController.getOrganisationDetail);
//# sourceMappingURL=organisationRoutes.js.map