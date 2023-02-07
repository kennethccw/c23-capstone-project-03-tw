import { Router } from "express";
import { editAnimalsController } from "../routes";
// import { uploadMiddlewareForAnimal } from "../utils/formidableForAnimal";
import { FileControllerForAnimal } from "../utils/formidableS3ForAnimal";
import { isLoggedInAPI } from "../utils/guards";

export const editAnimalsRoutes = Router();

const formidablePet = new FileControllerForAnimal();

editAnimalsRoutes.post(
  "/addAnimals",
  isLoggedInAPI,
  formidablePet.upload,
  editAnimalsController.addAnimals
);
editAnimalsRoutes.post("/deleteAnimals", isLoggedInAPI, editAnimalsController.deleteAnimals);
editAnimalsRoutes.get(
  "/getAniamls/:organisationID",
  isLoggedInAPI,
  editAnimalsController.getAnimals
);
