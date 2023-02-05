import { EditAnimalsService } from "../services/EditAnimalsService";
import { Request, Response } from "express";
import formidable from "formidable";

export class EditAnimalsController {

    //@ts-ignore
    constructor(private editAnimalsService: EditAnimalsService) { }

    addAnimals = async (req: Request, res: Response) => {

        try {
          const animalName = req.form.fields.animalName  
          const gender = req.form.fields.gender
          const weight = req.form.fields.weight
          const breed = req.form.fields.breed
          const remark= req.form.fields.remark
          const file = req.form.files['file'] as formidable.File
          const newFile = file.newFilename
          const organisation_id = req.form.fields.organisation_id
          const age = req.form.fields.age;
    
          // console.log(animalName, 'EditAnimalsController.ts L23')
          // console.log(newFile, 'EditAnimalsController.ts L23')
          // console.log(organisation_id, 'EditAnimalsController.ts L24')
          await this.editAnimalsService.addAnimals(animalName as string, gender as string, parseInt(weight as string), breed as string, remark as string, newFile as string,parseInt(organisation_id as string), parseInt(age as string));
    
          res.status(200).json({ message: "新增成功!" })
        } catch (e) { res.status(400).json({ message: "Internal Server Error" }); }
    
    
      }



    getAnimals = async (req: Request, res: Response) => {
        try {
          // console.log(req.params.organisationID, 'EditActivitiesController.ts L38')
          const organisationId= parseInt(req.params.organisationID); 
          // console.log(organisationId, 'EditAnimalsController.ts L41')
          let getAnimalsResult = await this.editAnimalsService.getAnimals(organisationId)
    
          // console.log(getAnimalsResult, 'EditAnimalsController.ts L44')
          res.status(200).json(getAnimalsResult )
        }
        catch (e) { res.status(400).json({ message: "Internal Server Error" }); }
    
    
    
      }


      deleteAnimals = async (req: Request, res: Response) => {

        try {
          const { animalID, organisationID } = req.body
          console.log(animalID,organisationID, 'EditAnimalsController.ts L55')
        await this.editAnimalsService.deleteAnimals(animalID as string,  organisationID as number)
          // console.log(deleteActivsResult, 'EditActivitiesController.ts L57')
          res.status(200).json({ result: "deleted successfully !" })
        }
        catch (e) { res.status(400).json({ message: "Internal Server Error" }); }
    
    
      }





}