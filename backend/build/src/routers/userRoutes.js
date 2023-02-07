"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
// import { uploadMiddleware } from "../utils/formidable";
var guards_1 = require("../utils/guards");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.post("/register", routes_1.userController.register);
exports.userRoutes.post("/login/validation", guards_1.isLoggedInAPI, routes_1.userController.validation);
exports.userRoutes.post("/login", routes_1.userController.loginWithUsernameOrEmail);
exports.userRoutes.get("/login/google", routes_1.userController.loginWithGoogle);
exports.userRoutes.post("/login/facebook", routes_1.userController.loginWithFacebook);
exports.userRoutes.get("/profile", guards_1.isLoggedInAPI, routes_1.userController.getProfile);
exports.userRoutes.put("/profile", guards_1.isLoggedInAPI, routes_1.userController.editProfile);
exports.userRoutes.put("/profile/password", guards_1.isLoggedInAPI, routes_1.userController.changePassword);
exports.userRoutes.get("/logout", routes_1.userController.logout);
//# sourceMappingURL=userRoutes.js.map