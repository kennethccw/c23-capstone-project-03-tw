import { Router } from "express";
import { volunteerRecordController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const volunteerRecordRoutes = Router();

volunteerRecordRoutes.get("/", isLoggedInAPI, volunteerRecordController.getVolunteerHistory);
