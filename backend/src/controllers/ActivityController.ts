import { ActivityService } from "../services/ActivityService";
import { Request, Response } from "express";

export class ActivityController {
  constructor(private activityService: ActivityService) {}

  getActivityDetail = async (req: Request, res: Response) => {
    console.log("controller");
    const id = parseInt(req.query.id as string);
    try {
      const data = await this.activityService.getActivityDetail(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
