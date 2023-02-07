import { Router } from "express";
import { editActivitiesController } from "../routes";
// import { uploadMiddlewareForActivities } from "../utils/formidableForActivities";
import { FileControllerForActivities } from "../utils/formidableS3ForActivities";
import { isLoggedInAPI } from "../utils/guards";

export const editActivitiesRoutes = Router();

const formidableAcitivies = new FileControllerForActivities();

editActivitiesRoutes.post(
  "/addActivities",
  isLoggedInAPI,
  formidableAcitivies.upload,
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
