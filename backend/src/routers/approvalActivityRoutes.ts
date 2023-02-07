import { Router } from "express";
import { approvalActivityController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const approvalActivityRoutes = Router();

approvalActivityRoutes.get("/", isLoggedInAPI, approvalActivityController.getPendingApplication);
approvalActivityRoutes.get("/alreadyApproved", isLoggedInAPI, approvalActivityController.getApprovedApplication);
