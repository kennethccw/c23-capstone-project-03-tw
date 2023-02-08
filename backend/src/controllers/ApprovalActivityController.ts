import { Request, Response } from "express";
import { ApprovalActivityService } from "../services/ApprovalActivityService";
import { ActivityApproval } from "../utils/models";

export class ApprovalActivityController {
  constructor(private approvalActivityService: ApprovalActivityService) {}

  getPendingApplication = async (req: Request, res: Response) => {
    const organisationId = req.user?.id!;
    try {
      const result = await this.approvalActivityService.getPendingApplication(organisationId);
      // console.log(result, "ApprovalActivityController.ts L11");
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  putPendingApplication = async (req: Request, res: Response) => {
    const organisationId = req.user?.id!;
    const applicationArr: ActivityApproval[] = req.body.application;
    try {
      const result = await this.approvalActivityService.putPendingApplication(
        organisationId,
        applicationArr
      );
      // console.log(result, "ApprovalActivityController.ts L11");
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Internal Server Error" });
    }
  };

  getApprovedApplication = async (req: Request, res: Response) => {
    try {
      const organisationId = req.user?.id!;
      const result = await this.approvalActivityService.getApprovedApplication(organisationId);
      // console.log(result, "ApprovalActivityController.ts L23");
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
