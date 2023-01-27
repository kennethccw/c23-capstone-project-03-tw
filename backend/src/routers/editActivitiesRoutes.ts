import { Router } from "express";
import { editActivitiesController } from "../routes";
import { uploadMiddleware } from "../utils/formidable";
import { isLoggedInAPI } from "../utils/guards";

export const editActivitiesRoutes = Router();

editActivitiesRoutes.post("/addActivities",isLoggedInAPI, uploadMiddleware,editActivitiesController.addActivities);
// editActivitiesRoutes.post("/deleteActivities",  EditActivitiesController.deleteActivities);