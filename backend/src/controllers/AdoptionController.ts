import {AdoptionService} from "../services/AdoptionService";
import { Request, Response } from "express";

export class AdoptionController {
  constructor(private adoptionService: AdoptionService) {}

  getPetAdoption = async (req: Request, res: Response) => {
    const id = parseInt(req.query.id as string);
    try {
      const data = await this.adoptionService.getPetAdoption (id);
    res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Please log in or sign up for an account first" });
    }
  };
  getAllPetAdoption = async (req: Request, res: Response) => {
    try {
      const data = await this.adoptionService.getAllPetAdoption ();
    res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Please log in or sign up for an account first" });
    }
  };
}