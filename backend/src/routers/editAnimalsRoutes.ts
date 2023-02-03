import { Router } from "express";
import { editAnimalsController } from "../routes";
import { uploadMiddleware } from "../utils/formidable";
import { isLoggedInAPI } from "../utils/guards";

export const editAnimalsRoutes = Router();

editAnimalsRoutes.post("/addAnimals",isLoggedInAPI, uploadMiddleware,editAnimalsController.addAnimals);
editAnimalsRoutes.post("/deleteAnimals", isLoggedInAPI,editAnimalsController.deleteAnimals);
editAnimalsRoutes.get("/getAniamls/:organisationID",isLoggedInAPI,editAnimalsController.getAnimals);