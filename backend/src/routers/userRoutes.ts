import { Router } from "express";
import { userController } from "../routes";
import { uploadMiddleware } from "../utils/formidable";

export const userRoutes = Router();

userRoutes.post("/register", uploadMiddleware, userController.register);
userRoutes.post("/login", userController.loginWithUsernameOrEmail);
userRoutes.get("/login/google", userController.loginWithGoogle);
userRoutes.get("/profile", userController.getProfile);
userRoutes.put("/profile", uploadMiddleware, userController.editProfile);
userRoutes.get("/logout", userController.logout);
