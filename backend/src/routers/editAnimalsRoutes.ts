import { Router } from "express";
import { editAnimalsController, fileS3 } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const editAnimalsRoutes = Router();

editAnimalsRoutes.post(
  "/addAnimals",
  isLoggedInAPI,
  fileS3.upload("/photos/pet"),
  editAnimalsController.addAnimals
);
editAnimalsRoutes.post("/deleteAnimals", isLoggedInAPI, editAnimalsController.deleteAnimals);
editAnimalsRoutes.get(
  "/getAnimals/:organisationID",
  isLoggedInAPI,
  editAnimalsController.getAnimals
);
