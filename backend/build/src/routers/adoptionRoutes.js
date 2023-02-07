"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.adoptionRoutes = (0, express_1.Router)();
exports.adoptionRoutes.get("/", guards_1.isLoggedInAPI, routes_1.adoptionController.getAllPetAdoption);
exports.adoptionRoutes.get("/detail", guards_1.isLoggedInAPI, routes_1.adoptionController.getPetAdoption);
exports.adoptionRoutes.get("/result", guards_1.isLoggedInAPI, routes_1.adoptionController.getPetAdoptionResult);
exports.adoptionRoutes.post("/application", guards_1.isLoggedInAPI, routes_1.adoptionController.postPetAdoptionApplication);
exports.adoptionRoutes.put("/application", guards_1.isLoggedInAPI, routes_1.adoptionController.putPetAdoptionApplication);
exports.adoptionRoutes.get("/result/:organisationID", guards_1.isLoggedInAPI, routes_1.adoptionController.getAdoptionApplication);
exports.adoptionRoutes.post("/approveAdoption", guards_1.isLoggedInAPI, routes_1.adoptionController.approveAdoption);
exports.adoptionRoutes.post("/rejectAdoption", guards_1.isLoggedInAPI, routes_1.adoptionController.rejectAdoption);
//# sourceMappingURL=adoptionRoutes.js.map