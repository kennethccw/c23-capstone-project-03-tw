// import type { Knex } from "knex";

// // interface getActivitiesResult {
// //   id: number,
// //   name: string,
// //   image: string,
// //   description: string,
// //   date: string,
// //   location: string,
// //   remaining_place: number,
// //   organisation_id: number,
// //   organisation_name: string
// // }

// export class EditAnimalsService {
//   constructor(private knex: Knex) { }

//   async addAnimals(animalName:string, gender: string,weight: number, breed: string, illnessRecord:string, newFile: string,organisation_id: number) {

//     try {
//       let newlyCreatedActivityID = await this.knex
//         .insert({
//           name: animalName,
//           age: fee,
//           image: newFile,
//           remaining_place: remaining_place,
//           organisation_id: organisation_id
//         })
//         .into("activities").returning("id");
//       // console.log(newlyCreatedActivityID, "EditAcitivitiesService.ts L24")
//       return newlyCreatedActivityID
//     } catch (e) {
//       console.log(e);
//       throw e;
//     }



//   }

  // async getActivities(organisationId: number) {
    
  //   try {
  //     let getActivitiesResult = await this.knex.select<getActivitiesResult[]>('*',
  //       "organisations.name as organisation",
  //       "activities.name as activity",
  //       "activities.id as activity_id").from('activities').join('organisations', 'organisations.id', 'activities.organisation_id').where('organisation_id', organisationId).where('is_deleted', false)//select activities.id,activities.name,activities.description,activities.date,activities.location,activities.remaining_place,activities.organisation_id,organisations.name from activities join organisations on organisations.id=activities.organisation_id;
  //     // console.log(getActivitiesResult, 'EditActivitiesService.ts L43')
  //     return getActivitiesResult
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }

  // }

  // async deleteActivities(activityID: string, organisationID: number) {
  //   let deleteActivitiesResult = await this.knex.update('is_deleted', true).from('activities').where('organisation_id', organisationID).where('id', activityID).returning('is_deleted')

  //   console.log(deleteActivitiesResult, 'EditAcitivitiesService.ts L69')
  //   return deleteActivitiesResult
  // }



// }