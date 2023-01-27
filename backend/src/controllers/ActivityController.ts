import { ActivityService } from "../services/ActivityService";
import { Request, Response } from "express";
import { ActivityPreview, Profile } from "../utils/models";
import { logger } from "../utils/logger";

export class ActivityController {
  constructor(private activityService: ActivityService) {}

  getAllActivities = async (req: Request, res: Response) => {
    try {
      const data = await this.activityService.getAllActivities();
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  getActivityDetail = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string);
    try {
      const data = await this.activityService.getActivityDetail(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  getActivitiesByCategory = async (req: Request, res: Response) => {
    const type = req.query.type as string;
    try {
      const data: ActivityPreview[] = await this.activityService.getActivitiesByCategory(type);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  postActivityApplication = async (req: Request, res: Response) => {
    const uid = req.user?.id!;
    const activityId: number = req.body.activityId;
    const user: Profile = req.body.profile;
    try {
      const data = await this.activityService.postActivityApplication(uid, activityId, user);
      res.status(200).json(data);
    } catch (e) {
      logger.error(e.message);
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  putActivityApplication = async (req: Request, res: Response) => {
    const uid = req.user?.id!;
    const activityId: number = req.body.activityId;
    try {
      const data = await this.activityService.putActivityApplication(uid, activityId);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
