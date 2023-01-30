import type { Knex } from "knex";
import { AdoptionApplication, PetDetail, PetPreview } from "../utils/models";
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
      const isAppliedBefore = await this.knex(TABLES.ADOPTION_APPLICATIONS)
        .select()
        .where("user_id", adoptionApplication.user_id)
        .andWhere("pet_id", adoptionApplication.pet_id)
        .first();
      console.log(isAppliedBefore);
      if (isAppliedBefore) {
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
}
