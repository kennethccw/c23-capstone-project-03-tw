import type { Knex } from "knex";
import { PetPreview } from "../utils/models";

// interface getActivitiesResult {
//   id: number,
//   name: string,
//   image: string,
//   description: string,
//   date: string,
//   location: string,
//   remaining_place: number,
//   organisation_id: number,
//   organisation_name: string
// }

export class EditAnimalsService {
  constructor(private knex: Knex) { }

  async addAnimals(animalName:string, gender: string,weight: number, breed: string, remark:string, newFile: string,organisation_id: number, age:number) {

    try {
      let newlyCreatedActivityID = await this.knex
        .insert({
          name: animalName,
          gender:gender,
          weight: weight,
          breed: breed,
          remark: remark,
          image:newFile,
          organisation_id:organisation_id,
          age: age,
        })
        .into("pets").returning("id");
      console.log(newlyCreatedActivityID, "EditAcitivitiesService.ts L24")
      return newlyCreatedActivityID
    } catch (e) {
      console.log(e);
      throw e;
    }



  }

  async getAnimals(organisationId: number) {
    
    try {
      let getAnimalsResult = await this.knex.select<PetPreview[]>('*', "pets.id as pet_id").from('pets').where('organisation_id', organisationId).where('is_deleted', false)//select activities.id,activities.name,activities.description,activities.date,activities.location,activities.remaining_place,activities.organisation_id,organisations.name from activities join organisations on organisations.id=activities.organisation_id;
      // console.log(getAnimalsResult, 'EditAnimalsService.ts L43')
      return getAnimalsResult
    } catch (e) {
      console.log(e);
      throw e;
    }

  }

  async deleteAnimals(activityID: string, organisationID: number) {
    let deleteAnimalsResult = await this.knex.update('is_deleted', true).from('pets').where('organisation_id', organisationID).where('id', activityID).returning('is_deleted')

    console.log(deleteAnimalsResult, 'EditAnimalsService.ts L69')
    return deleteAnimalsResult
  }



}