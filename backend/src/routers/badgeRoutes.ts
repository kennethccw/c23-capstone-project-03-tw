import { Router } from "express";
import { badgeController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const badgeRoutes = Router();

badgeRoutes.get("/", isLoggedInAPI, badgeController.getBadges);
