import { Router } from "express";
import { homeController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const homeRoutes = Router();

homeRoutes.get("/activity", homeController.getHomeActivities);
homeRoutes.get("/advertiser", homeController.getHomeAdvertisers);
homeRoutes.post("/advertiser", isLoggedInAPI, homeController.postHomeAdvertiser);
