"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editAnimalsRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.editAnimalsRoutes = (0, express_1.Router)();
exports.editAnimalsRoutes.post("/addAnimals", guards_1.isLoggedInAPI, routes_1.fileS3.upload("/photos/pet"), routes_1.editAnimalsController.addAnimals);
exports.editAnimalsRoutes.post("/deleteAnimals", guards_1.isLoggedInAPI, routes_1.editAnimalsController.deleteAnimals);
exports.editAnimalsRoutes.get("/getAnimals/:organisationID", guards_1.isLoggedInAPI, routes_1.editAnimalsController.getAnimals);
//# sourceMappingURL=editAnimalsRoutes.js.map