import { Router } from "express";
import { scheduleController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const scheduleRoutes = Router();

scheduleRoutes.get("/", isLoggedInAPI, scheduleController.getScheduleActivities);
