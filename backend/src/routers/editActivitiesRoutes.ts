import { Router } from "express";
import { editActivitiesController } from "../routes";
import { uploadMiddleware } from "../utils/formidable";


export const editActivitiesRoutes = Router();

editActivitiesRoutes.post("/addActivities", uploadMiddleware,editActivitiesController.addActivities);
// editActivitiesRoutes.post("/deleteActivities",  EditActivitiesController.deleteActivities);