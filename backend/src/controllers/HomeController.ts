import { HomeService } from "../services/HomeService";
import { Request, Response } from "express";

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
}
