import type { Knex } from "knex";


export class EditActivitiesService {
  constructor(private knex: Knex) { }

  async addActivities(activityName: string, activityDetails: string, date: string, activityStartTime: string, activityEndTime: string, requirements: string, district: string, address: string, count: number, remaining_place: number, fee: number, newFile: string, type: string, organisation_id: number) {

    try {
      let newlyCreatedActivityID = await this.knex
        .insert({
          name: activityName,
          description: activityDetails,
          date: date,
          start_time: activityStartTime,
          end_time: activityEndTime,
          requirement: requirements,
          district: district,
          location: address,
          total_place: count,
          fee: fee,
          image: newFile,
          type: type,
          remaining_place: remaining_place,
          organisation_id: organisation_id
        })
        .into("activities").returning("id");
      console.log(newlyCreatedActivityID, "EditAcitivitiesService.ts L24")
      return newlyCreatedActivityID
    } catch (e) {
      console.log(e);
      throw e;
    }



  }





}