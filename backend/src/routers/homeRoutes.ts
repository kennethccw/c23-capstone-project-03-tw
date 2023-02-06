import { Router } from "express";
import { homeController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const homeRoutes = Router();

homeRoutes.get("/activity", isLoggedInAPI, homeController.getHomeActivities);
homeRoutes.get("/notification", isLoggedInAPI, homeController.getNotification);
homeRoutes.delete("/notification", isLoggedInAPI, homeController.deleteNotification);
homeRoutes.get("/advertiser", isLoggedInAPI, homeController.getHomeAdvertisers);
homeRoutes.post("/advertiser", isLoggedInAPI, homeController.postHomeAdvertiser);
