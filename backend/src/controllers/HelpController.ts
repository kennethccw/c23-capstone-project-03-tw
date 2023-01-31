import { HelpService } from "../services/HelpService";
import { Request, Response } from "express";
export class HelpController {
  constructor(private helpService: HelpService) {}

  getOrganisationChatroom = async (req: Request, res: Response) => {
    const uid = req.user?.id!;
    const organisationId = parseInt(req.query.id as string);

    try {
      const result = await this.helpService.getOrganisationChatroom(uid, organisationId);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
