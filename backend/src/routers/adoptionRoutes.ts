import { Router } from "express";
import { adoptionController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const adoptionRoutes = Router();

adoptionRoutes.get("/", isLoggedInAPI, adoptionController.getAllPetAdoption);
adoptionRoutes.get("/detail", isLoggedInAPI, adoptionController.getPetAdoption);
adoptionRoutes.get("/result", isLoggedInAPI, adoptionController.getPetAdoptionResult);
adoptionRoutes.post("/application", isLoggedInAPI, adoptionController.postPetAdoptionApplication);
adoptionRoutes.put("/application", isLoggedInAPI, adoptionController.putPetAdoptionApplication);
adoptionRoutes.get("/result/:organisationID", isLoggedInAPI, adoptionController.getAdoptionApplication);
adoptionRoutes.post("/approveAdoption", isLoggedInAPI, adoptionController.approveAdoption);
adoptionRoutes.post("/rejectAdoption", isLoggedInAPI, adoptionController.rejectAdoption);