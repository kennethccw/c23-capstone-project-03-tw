import { AdoptionService } from "../services/AdoptionService";
import { Request, Response } from "express";
import { AdoptionApplication } from "../utils/models";

export class AdoptionController {
  constructor(private adoptionService: AdoptionService) { }

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
  putPetAdoptionApplication = async (req: Request, res: Response) => {
    try {
      const user_id = req.user?.id!;
      const pet_id: number = req.body.petId;
      const data = await this.adoptionService.putPetAdoptionApplication(user_id, pet_id);
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

  getPetAdoptionResult = async (req: Request, res: Response) => {
    try {
      const uid = req.user?.id!;
      const data = await this.adoptionService.getPetAdoptionResult(uid);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  };


  getAdoptionApplication = async (req: Request, res: Response) => {
    try {
      const organisationId = parseInt(req.params.organisationID);
      // console.log("AdoptionController.ts L72: " ,organisationId )
      let getAdoptionApplicationResult = await this.adoptionService.getAdoptionApplication(organisationId)
      // console.log(getAdoptionApplicationResult, 'AdoptionController.ts L74',)
      res.status(200).json(getAdoptionApplicationResult)
    }
    catch (e) {
      res.status(400).json({ message: "Internal Server Error" });
    }
  }

  approveAdoption = async (req: Request, res: Response) => {
    try {
      const { applicationID, animalID } = req.body
      console.log(applicationID, 'AdoptionController.ts L85')
      await this.adoptionService.approveAdoption(applicationID,animalID)
      res.status(200).json({ message: "已批准申請及拒絕其他人對此的申請" })


    }
    catch (e) { res.status(400).json({ message: "Internal Server Error" }); }

  }


  rejectAdoption = async (req: Request, res: Response) => {
    try {
      const { applicationID, rejectedReason, otherReason } = req.body;
      console.log("applicationID:", applicationID)
      console.log("rejectedReason:", rejectedReason);
      console.log('otherReason:', otherReason)
      await this.adoptionService.rejectAdoption(applicationID, rejectedReason, otherReason)
      res.status(200).json({ message: "已拒絕申請" })


    }
    catch (e) { res.status(400).json({ message: "Internal Server Error" }); }




  }





}
