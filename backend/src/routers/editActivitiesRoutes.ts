import { Router } from "express";
import { editActivitiesController } from "../routes";
import { uploadMiddlewareForActivities } from "../utils/formidableForActivities";
import { isLoggedInAPI } from "../utils/guards";

export const editActivitiesRoutes = Router();

editActivitiesRoutes.post(
  "/addActivities",
  isLoggedInAPI,
  uploadMiddlewareForActivities,
  editActivitiesController.addActivities
);
// editActivitiesRoutes.post("/deleteActivities",  EditActivitiesController.deleteActivities);
// editActivitiesRoutes.post("/getActivities", isLoggedInAPI, editActivitiesController.getActivities);
// editActivitiesRoutes.post("/addActivities",isLoggedInAPI, uploadMiddleware,editActivitiesController.addActivities);
editActivitiesRoutes.post(
  "/deleteActivities",
  isLoggedInAPI,
  editActivitiesController.deleteActivities
);
editActivitiesRoutes.get(
  "/getActivities/:organisationID",
  isLoggedInAPI,
  editActivitiesController.getActivities
);
