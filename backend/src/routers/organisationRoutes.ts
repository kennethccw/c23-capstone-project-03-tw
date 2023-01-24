import { Router } from "express";
import { organisationController } from "../routes";

export const organisationRoutes = Router();

organisationRoutes.get("/list", organisationController.getOrganisationList);
organisationRoutes.get("/detail", organisationController.getOrganisationDetail);
