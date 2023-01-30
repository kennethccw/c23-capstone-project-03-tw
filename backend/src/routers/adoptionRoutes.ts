import { Router } from "express";
import { adoptionController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const adoptionRoutes = Router();

adoptionRoutes.get("/", isLoggedInAPI, adoptionController.getAllPetAdoption);
adoptionRoutes.get("/detail", isLoggedInAPI, adoptionController.getPetAdoption);
