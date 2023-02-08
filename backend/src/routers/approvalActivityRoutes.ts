import { Router } from "express";
import { approvalActivityController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const approvalActivityRoutes = Router();

approvalActivityRoutes.get("/", isLoggedInAPI, approvalActivityController.getPendingApplication);
approvalActivityRoutes.put("/", isLoggedInAPI, approvalActivityController.putPendingApplication);
approvalActivityRoutes.get(
  "/alreadyApproved",
  isLoggedInAPI,
  approvalActivityController.getApprovedApplication
);
