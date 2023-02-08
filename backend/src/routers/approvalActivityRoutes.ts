import { Router } from "express";
import { approvalActivityController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const approvalActivityRoutes = Router();

approvalActivityRoutes.get(
  "/pending",
  isLoggedInAPI,
  approvalActivityController.getPendingApplication
);
approvalActivityRoutes.put(
  "/pending",
  isLoggedInAPI,
  approvalActivityController.putPendingApplication
);
approvalActivityRoutes.get(
  "/alreadyApproved",
  isLoggedInAPI,
  approvalActivityController.getApprovedApplication
);
