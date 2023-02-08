import { OrganisationService } from "../services/OrganisationService";
import { Request, Response } from "express";

export class OrganisationController {
  constructor(private organisationService: OrganisationService) {}

  getOrganisationList = async (req: Request, res: Response) => {
    try {
      const data = await this.organisationService.getOrganisationList();
      // console.log(data, "OrganisationController.ts L10")
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  getOrganisationDetail = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string);
    try {
      const data = await this.organisationService.getOrganisationDetail(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
