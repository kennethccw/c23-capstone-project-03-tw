import { AdoptionService } from "../services/AdoptionService";
import { Request, Response } from "express";
import { AdoptionApplication } from "../utils/models";

export class AdoptionController {
  constructor(private adoptionService: AdoptionService) {}

  getPetAdoption = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string);
    try {
      const data = await this.adoptionService.getPetAdoption(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  postPetAdoptionApplication = async (req: Request, res: Response) => {
    const user_id = req.user?.id!;
    const adoptionApplication: AdoptionApplication = req.body.adoptionApplication;

    const adoptionApplicationWithUid = { ...adoptionApplication, user_id };
    try {
      const data = await this.adoptionService.postPetAdoptionApplication(
        adoptionApplicationWithUid
      );
      if (data === "Applied Before") {
        res.status(200).json({ message: "Applied Before" });
        return;
      }
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
  getAllPetAdoption = async (req: Request, res: Response) => {
    try {
      const data = await this.adoptionService.getAllPetAdoption();
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };
}
