import { Request, Response } from "express";
import { ApprovalActivityService } from "../services/ApprovalActivityService";

export class ApprovalActivityController {
  constructor(private approvalActivityService: ApprovalActivityService) {}

  getPendingApplication = async (req: Request, res: Response) => {
    const organisationId = req.user?.id!;
    try {
      const result = await this.approvalActivityService.getPendingApplication(organisationId);
      console.log(result, "ApprovalActivityController.ts L11");
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
