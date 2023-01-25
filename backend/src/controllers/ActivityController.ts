import { ActivityService } from "../services/ActivityService";
import { Request, Response } from "express";
import { Profile } from "../utils/models";

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
  postActivityApplication = async (req: Request, res: Response) => {
    console.log("controller");
    const uid = req.user?.id!;
    const activityId = parseInt(req.query.id as string);
    const user: Profile = req.body;
    try {
      const data = await this.activityService.postActivityApplication(uid, activityId, user);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
