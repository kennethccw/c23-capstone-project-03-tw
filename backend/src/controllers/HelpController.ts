import { HelpService } from "../services/HelpService";
import { Request, Response } from "express";
import formidable from "formidable";
import { io } from "../main";
export class HelpController {
  constructor(private helpService: HelpService) {}

  getChatroom = async (req: Request, res: Response) => {
    try {
      const id = req.user?.id!;
      const organisationId = parseInt(req.query.oid as string);
      const userId = parseInt(req.query.uid as string);
      let result;
      console.log(organisationId);
      if (organisationId) {
        result = await this.helpService.getOrganisationChatroom(id, organisationId);
      } else if (userId) {
        result = await this.helpService.getUserChatroom(id, userId);
      } else {
        res.status(400).json({ message: "Internal Server Error" });
        return;
      }
      console.log(result);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  getSupportPanel = async (req: Request, res: Response) => {
    try {
      const organisationId = req.user?.id!;

      const result = await this.helpService.getSupportPanel(organisationId);

      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };

  postClientTextChatroom = async (req: Request, res: Response) => {
    try {
      const uid = req.user?.id!;
      const organisationId = req.body.oid;
      const conversation = req.body.conversation;

      const result = await this.helpService.postClientTextChatroom(
        uid,
        organisationId,
        conversation
      );
      setTimeout(() => {
        io.emit(`clientId${uid}-to-supportId${organisationId}`, { conversation });
        io.emit(`to-supportId${organisationId}`, {
          conversation,
          user: { id: uid, username: result.user.username },
        });
      }, 10);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  postClientImageChatroom = async (req: Request, res: Response) => {
    try {
      const uid = req.user?.id!;
      const organisationId = parseInt(req.form.fields.id as string);
      const image = (req.form.files["chatroomImage"] as formidable.File)?.newFilename;
      const result = await this.helpService.postClientImageChatroom(uid, organisationId, image);
      setTimeout(() => {
        io.emit(`clientId${uid}-to-supportId${organisationId}`, { image });
        io.emit(`to-supportId${organisationId}`, {
          image,
          user: { id: uid, username: result.user.username },
        });
      }, 100);
      console.log(result);

      res.status(200).json(result);
    } catch (e) {
      console.log(e);

      res.status(400).json({ message: "Internal Server Error" });
    }
  };

  postSupportTextChatroom = async (req: Request, res: Response) => {
    try {
      const organisationId = req.user?.id!;
      const uid = req.body.uid;
      const conversation = req.body.conversation;

      const result = await this.helpService.postSupportTextChatroom(
        uid,
        organisationId,
        conversation
      );
      setTimeout(() => {
        io.emit(`supportId${organisationId}-to-clientId${uid}`, { conversation });
      }, 10);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  postSupportImageChatroom = async (req: Request, res: Response) => {
    try {
      const organisationId = req.user?.id!;
      const uid = parseInt(req.form.fields.id as string);
      const image = (req.form.files["chatroomImage"] as formidable.File)?.newFilename;
      const result = await this.helpService.postSupportImageChatroom(uid, organisationId, image);
      setTimeout(() => {
        io.emit(`supportId${organisationId}-to-clientId${uid}`, { image });
      }, 100);
      console.log(result);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);

      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
