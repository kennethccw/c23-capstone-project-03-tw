"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpRoutes = void 0;
var express_1 = require("express");
var routes_1 = require("../routes");
var guards_1 = require("../utils/guards");
exports.helpRoutes = (0, express_1.Router)();
exports.helpRoutes.get("/chatroom", guards_1.isLoggedInAPI, routes_1.helpController.getChatroom);
exports.helpRoutes.get("/panel", guards_1.isLoggedInAPI, routes_1.helpController.getSupportPanel);
exports.helpRoutes.post("/chatroom/client/text", guards_1.isLoggedInAPI, routes_1.helpController.postClientTextChatroom);
exports.helpRoutes.post("/chatroom/client/image", guards_1.isLoggedInAPI, routes_1.fileS3.upload("/photos/animalNeedHelp"), routes_1.helpController.postClientImageChatroom);
exports.helpRoutes.post("/chatroom/support/text", guards_1.isLoggedInAPI, routes_1.helpController.postSupportTextChatroom);
exports.helpRoutes.post("/chatroom/support/image", guards_1.isLoggedInAPI, routes_1.fileS3.upload("/photos/animalNeedHelp"), routes_1.helpController.postSupportImageChatroom);
//# sourceMappingURL=helpRoutes.js.map