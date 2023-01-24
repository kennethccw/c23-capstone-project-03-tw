import { Router } from "express";
import { homeController } from "../routes";

export const homeRoutes = Router();

homeRoutes.get("/activity", homeController.getHomeActivities);
