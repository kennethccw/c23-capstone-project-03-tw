import type { Knex } from "knex";
import {
  AdoptionApplication,
  AdoptionResult,
  AdoptionResultStatus,
  PetDetail,
  PetPreview,
} from "../utils/models";
import { TABLES } from "../utils/tables";

export class AdoptionService {
  constructor(private knex: Knex) {}

  getPetAdoption = async (id: number) => {
    console.log("hihihi");
    try {
      const result: PetDetail = await this.knex<PetDetail>(TABLES.PETS)
        .select("*", "pets.id as pet_id", "organisations.name as organisation", "pets.name as name")
        .innerJoin(TABLES.ORGANISATIONS, "pets.organisation_id", "organisations.id")
        .first()
        .where("pets.id", id);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  postPetAdoptionApplication = async (adoptionApplication: AdoptionApplication) => {
    console.log("hihihi");
    try {
      const isAppliedBefore: AdoptionResult = await this.knex(TABLES.ADOPTION_APPLICATIONS)
        .select()
        .where("user_id", adoptionApplication.user_id)
        .andWhere("pet_id", adoptionApplication.pet_id)
        .first();
      console.log(isAppliedBefore);
      if (isAppliedBefore && isAppliedBefore.status !== AdoptionResultStatus.cancelled) {
        return "Applied Before";
      }
      const result = await this.knex<AdoptionApplication>(TABLES.ADOPTION_APPLICATIONS)
        .insert(adoptionApplication)
        .returning("*");
      console.log(result[0]);
      return result[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  putPetAdoptionApplication = async (user_id: number, pet_id: number) => {
    console.log("hihihi");
    try {
      const result = await this.knex(TABLES.ADOPTION_APPLICATIONS)
        .update({ status: "cancelled", updated_at: new Date() })
        .where("user_id", user_id)
        .andWhere("pet_id", pet_id)
        .returning("*");
      console.log(result[0]);
      return result[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  getAllPetAdoption = async () => {
    console.log("hihihi");
    try {
      const result: PetPreview[] = await this.knex<PetPreview>(TABLES.PETS)
        .select("*", "organisations.name as organisation", "pets.name as name", "pets.id as pet_id")
        .innerJoin(TABLES.ORGANISATIONS, "pets.organisation_id", "organisations.id");

      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  getPetAdoptionResult = async (uid: number) => {
    try {
      const result: AdoptionResult[] = await this.knex(TABLES.ADOPTION_APPLICATIONS)
        .select(
          "*",
          `${TABLES.ADOPTION_APPLICATIONS}.id as application_id`,
          `${TABLES.PETS}.id as pet_id`
        )
        .innerJoin(TABLES.PETS, `${TABLES.ADOPTION_APPLICATIONS}.pet_id`, `${TABLES.PETS}.id`)
        .where(`${TABLES.ADOPTION_APPLICATIONS}.user_id`, uid)
        .andWhere(`${TABLES.ADOPTION_APPLICATIONS}.status`, "<>", AdoptionResultStatus.cancelled);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };


  getAdoptionApplication=async (organisationId: number) =>{
    
    try {
      let getAdoptionApplicationResult = await this.knex.select<AdoptionApplication[]>('name' 
      // ,'pets.name as pet_name', 'pets.image as pet_image'
      )
      .from('adoption_applications')
      // .join('pets','adoption_applications.pet_id', 'pets.id').join('organisations','organisations.id', 'pets.organisation_id')
      // // .join('pets', 'pets.id', 'adoption_applications.pet_id')
      // .where('organisation_id', organisationId)
      // .where('status','pending' )
       
      
      //select * from adoption_applications join pets on pets.is=adoption_applications.pet_id;
      // console.log(getActivitiesResult, 'EditActivitiesService.ts L43')
      console.log(getAdoptionApplicationResult,'AdoptionService.ts L107')
      return getAdoptionApplicationResult
    } catch (e) {
      console.log(e);
      throw e;
    }

  }
}
