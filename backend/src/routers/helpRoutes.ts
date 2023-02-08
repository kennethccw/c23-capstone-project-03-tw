import { Router } from "express";
import { fileS3, helpController } from "../routes";
// import { uploadMiddlewareForChatroom } from "../utils/formidableForChatroom";
import { isLoggedInAPI } from "../utils/guards";

export const helpRoutes = Router();

helpRoutes.get("/chatroom", isLoggedInAPI, helpController.getChatroom);
helpRoutes.get("/panel", isLoggedInAPI, helpController.getSupportPanel);
helpRoutes.post("/chatroom/client/text", isLoggedInAPI, helpController.postClientTextChatroom);
// helpRoutes.post(
//   "/chatroom/client/image",
//   isLoggedInAPI,
//   uploadMiddlewareForChatroom,
//   helpController.postClientImageChatroom
// );
helpRoutes.post(
  "/chatroom/client/image",
  isLoggedInAPI,
  fileS3.upload("/photos/animalNeedHelp"),
  helpController.postClientImageChatroom
);
helpRoutes.post("/chatroom/support/text", isLoggedInAPI, helpController.postSupportTextChatroom);
// helpRoutes.post(
//   "/chatroom/support/image",
//   isLoggedInAPI,
//   uploadMiddlewareForChatroom,
//   helpController.postSupportImageChatroom
// );
helpRoutes.post(
  "/chatroom/support/image",
  isLoggedInAPI,
  fileS3.upload("/photos/animalNeedHelp"),
  helpController.postSupportImageChatroom
);
