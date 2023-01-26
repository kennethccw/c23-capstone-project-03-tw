import { BadgeService } from "../services/BadgeService";
import { Request, Response } from "express";
export class BadgeController {
  constructor(private badgeService: BadgeService) {}

  getBadges = async (req: Request, res: Response) => {
    const uid = req.user?.id!;
    try {
      const result = await this.badgeService.getBadges(uid);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
