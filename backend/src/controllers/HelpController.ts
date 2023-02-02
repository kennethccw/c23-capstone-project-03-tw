import { HelpService } from "../services/HelpService";
import { Request, Response } from "express";
import formidable from "formidable";
import { io } from "../main";
export class HelpController {
  constructor(private helpService: HelpService) {}

  getOrganisationChatroom = async (req: Request, res: Response) => {
    try {
      const uid = req.user?.id!;
      const organisationId = parseInt(req.query.id as string);

      const result = await this.helpService.getOrganisationChatroom(uid, organisationId);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };

  postClientTextChatroom = async (req: Request, res: Response) => {
    try {
      const uid = req.user?.id!;
      const organisationId = req.body.id;
      const conversation = req.body.conversation;

      const result = await this.helpService.postClientTextChatroom(
        uid,
        organisationId,
        conversation
      );
      setTimeout(() => {
        io.emit("message", { conversation });
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
      console.log(uid, organisationId, image, "this.postImageChatroom");
      const result = await this.helpService.postClientImageChatroom(uid, organisationId, image);
      setTimeout(() => {
        io.emit("message", { image });
      }, 10);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);

      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
