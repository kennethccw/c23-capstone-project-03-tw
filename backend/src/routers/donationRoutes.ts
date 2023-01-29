import { Router } from "express";
import { donationController } from "../routes";
import { isLoggedInAPI } from "../utils/guards";

export const donationRoutes = Router();

donationRoutes.put("/", isLoggedInAPI, donationController.putDonationSubmition);
donationRoutes.post("/", isLoggedInAPI, donationController.postDonationRender);
