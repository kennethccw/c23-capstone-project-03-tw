import { Router } from "express";
import { editActivitiesController, fileS3 } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const editActivitiesRoutes = Router();

editActivitiesRoutes.post(
  "/addActivities",
  isLoggedInAPI,
  fileS3.upload("/photos/activities"),
  editActivitiesController.addActivities
);

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
