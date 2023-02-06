import { HomeService } from "../services/HomeService";
import { Request, Response } from "express";
import { HomeNotification } from "../utils/models";

export class HomeController {
  constructor(private homeService: HomeService) {}

  getHomeActivities = async (req: Request, res: Response) => {
    try {
      const data = await this.homeService.getHomeActivities();
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  getHomeAdvertisers = async (req: Request, res: Response) => {
    try {
      const data = await this.homeService.getHomeAdvertisers();
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  postHomeAdvertiser = async (req: Request, res: Response) => {
    const uid = req.user!.id;
    const adsId: number = req.body.adsId;
    try {
      const data = await this.homeService.postHomeAdvertiser(uid, adsId);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  getNotification = async (req: Request, res: Response) => {
    const uid = req.user!.id;
    try {
      const result: HomeNotification[] = await this.homeService.getNotification(uid);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  deleteNotification = async (req: Request, res: Response) => {
    const notificationId: number = req.body.notificationId;

    try {
      await this.homeService.deleteNotification(notificationId);
      res.status(200).json({ message: "deleted" });
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
