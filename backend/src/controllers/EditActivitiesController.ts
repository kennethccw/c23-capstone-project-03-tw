import { EditActivitiesService } from "../services/EditActivitiesService";
import { Request, Response } from "express";
import formidable from "formidable";

export class EditActivitiesController {

  //@ts-ignore
  constructor(private editActivitiesService: EditActivitiesService) { }

  addActivities = async (req: Request, res: Response) => {

    try {
      const activityName = req.form.fields.activityName
      const activityDetails = req.form.fields.activityDetails
      const date = req.form.fields.date
      const activityStartTime = req.form.fields.activityStartTime
      const activityEndTime = req.form.fields.activityEndTime
      const requirements = req.form.fields.requirements
      const district = req.form.fields.district
      const address = req.form.fields.address
      const count = req.form.fields.count
      const remaining_place = req.form.fields.remaining_place
      const fee = req.form.fields.fee
      const file = req.form.files['file'] as formidable.File
      const newFile = file.newFilename
      const type = req.form.fields.type
      const organisation_id = req.form.fields.organisation_id

      await this.editActivitiesService.addActivities(activityName, activityDetails, date, activityStartTime, activityEndTime, requirements, district, address, parseInt(count), parseInt(remaining_place), parseInt(fee),
        newFile,
        type, parseInt(organisation_id));

        res.status(200).json({message:"新增成功!"})
    } catch (e) { res.status(400).json({ message: "Internal Server Error" }); }


  }

  getActivities = async (req: Request, res: Response) =>{
    const {organisationId}=req.body;
    console.log(organisationId, 'EditActivitiesController.ts L41')
    let getActivitiesResult= await this.editActivitiesService.getActivities(organisationId)

    console.log(getActivitiesResult,'EditActivitiesController.ts L44')
    
  }
}