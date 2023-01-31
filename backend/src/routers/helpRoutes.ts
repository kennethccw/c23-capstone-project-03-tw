import { Router } from "express";
import { helpController } from "../routes";

export const helpRoutes = Router();

helpRoutes.get("/chatroom", helpController.getOrganisationChatroom);
