import { ScheduleService } from "../services/ScheduleService";
import { Request, Response } from "express";
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  getScheduleActivities = async (req: Request, res: Response) => {
    const uid = req.user?.id!;
    try {
      const data = await this.scheduleService.getScheduleActivities(uid);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
