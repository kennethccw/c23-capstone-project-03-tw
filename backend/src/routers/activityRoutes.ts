import { Router } from "express";
import { activityController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const activityRoutes = Router();

activityRoutes.get("/detail", activityController.getActivityDetail);
activityRoutes.post("/application", isLoggedInAPI, activityController.postActivityApplication);
activityRoutes.put("/application", isLoggedInAPI, activityController.putActivityApplication);
