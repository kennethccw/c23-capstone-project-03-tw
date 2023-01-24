import { Router } from "express";
import { activityController } from "../routes";

export const activityRoutes = Router();

activityRoutes.get("/detail", activityController.getActivityDetail);
