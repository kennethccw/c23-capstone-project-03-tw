import { Router } from "express";
import { helpController } from "../routes";
import { uploadMiddleware } from "../utils/formidable";
import { isLoggedInAPI } from "../utils/guards";

export const helpRoutes = Router();

helpRoutes.get("/chatroom", isLoggedInAPI, helpController.getOrganisationChatroom);
helpRoutes.post("/chatroom/text", isLoggedInAPI, helpController.postClientTextChatroom);
helpRoutes.post(
  "/chatroom/image",
  isLoggedInAPI,
  uploadMiddleware,
  helpController.postClientImageChatroom
);
