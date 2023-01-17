import { Router } from "express";
import { userController } from "../routes";
import { uploadMiddleware } from "../utils/formidable";
import { isLoggedInAPI } from "../utils/guards";

export const userRoutes = Router();

userRoutes.post("/register", uploadMiddleware, userController.register);
userRoutes.post("/login/validation", isLoggedInAPI, userController.validation);
userRoutes.post("/login", userController.loginWithUsernameOrEmail);
userRoutes.get("/login/google", userController.loginWithGoogle);
userRoutes.post("/login/facebook", userController.loginWithFacebook);
userRoutes.get("/profile", isLoggedInAPI, userController.getProfile);
userRoutes.put("/profile", isLoggedInAPI, uploadMiddleware, userController.editProfile);
userRoutes.get("/logout", userController.logout);
