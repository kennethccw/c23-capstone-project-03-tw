import { Router } from "express";
import { editAnimalsController } from "../routes";
import { uploadMiddlewareForAnimal } from "../utils/formidableForAnimal";
import { isLoggedInAPI } from "../utils/guards";

export const editAnimalsRoutes = Router();

editAnimalsRoutes.post(
  "/addAnimals",
  isLoggedInAPI,
  uploadMiddlewareForAnimal,
  editAnimalsController.addAnimals
);
editAnimalsRoutes.post("/deleteAnimals", isLoggedInAPI, editAnimalsController.deleteAnimals);
editAnimalsRoutes.get(
  "/getAniamls/:organisationID",
  isLoggedInAPI,
  editAnimalsController.getAnimals
);
