import { Router } from "express";
import { activityController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const activityRoutes = Router();

activityRoutes.get("/", activityController.getAllActivities);
activityRoutes.get("/detail", activityController.getActivityDetail);
activityRoutes.get("/category", activityController.getActivitiesByCategory);
activityRoutes.post("/application", isLoggedInAPI, activityController.postActivityApplication);
activityRoutes.put("/application", isLoggedInAPI, activityController.putActivityApplication);
