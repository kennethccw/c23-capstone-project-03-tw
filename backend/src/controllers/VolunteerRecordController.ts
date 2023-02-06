import { VolunteerRecordService } from "../services/VolunteerRecordService";
import { Request, Response } from "express";
export class VolunteerRecordController {
  constructor(private volunteerRecordService: VolunteerRecordService) {}

  getVolunteerHistory = async (req: Request, res: Response) => {
    const uid = req.user?.id!;

    try {
      const result = await this.volunteerRecordService.getVolunteerHistory(uid);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
