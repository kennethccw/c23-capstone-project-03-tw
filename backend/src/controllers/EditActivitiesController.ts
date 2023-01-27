import { EditActivitiesService } from "../services/EditActivitiesService";
import { Request, Response } from "express";


export class EditActivitiesController {

    constructor(private editActivitiesService: EditActivitiesService) {
        this.editActivitiesService = editActivitiesService;
    }

    addActivities = async (req: Request, res: Response) => {
        const { activityName, activityDetails, date, activityStartTime, activityEndTime, requirements, district, address, count,remaining_place, fee, file, type, organisation_id } = req.body;





        console.log(activityName, "EditActivitiesController.ts L13")
        console.log(activityDetails,"EditActivitiesController.ts L14")
        console.log(date,"EditActivitiesController.ts L15")
        console.log(activityStartTime, "EditActivitiesController.ts L16")
        console.log(activityEndTime, "EditActivitiesController.ts L17")
        console.log(requirements, "EditActivitiesController.ts L18")
        console.log(district, "EditActivitiesController.ts L19")
        console.log(address, "EditActivitiesController.ts L20")
        console.log(count, "EditActivitiesController.ts L21")
        console.log(remaining_place, "EditActivitiesController.ts L21")
        console.log(fee, "EditActivitiesController.ts L22")
        console.log(file, "EditActivitiesController.ts L23")
        console.log(type, "EditActivitiesController.ts L24")
        console.log(organisation_id, "EditActivitiesController.ts L25")
        await this.editActivitiesService.addActivities(activityName, activityDetails, date, activityStartTime, activityEndTime, requirements, district, address, count,remaining_place, fee, file, type, organisation_id);

    }
}