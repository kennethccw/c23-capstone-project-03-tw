import type { Knex } from "knex";
import { PetDetail, PetPreview } from "../utils/models";
import { TABLES } from "../utils/tables";

export class AdoptionService {
  constructor (private knex: Knex) {}
  
  getPetAdoption = async (id: number) => {
    console.log("hihihi");
    try {
      const result: PetDetail = await this.knex<PetDetail>(TABLES.PETS)
      .select ("*", "pets.id as pet_id", "organisations.name as organisation", 'pets.name as name')
      .innerJoin (TABLES.ORGANISATIONS, "pets.organisation_id", "organisations.id")
      .first ()
      .where ("pets.id", id);
      console.log(result)
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  getAllPetAdoption = async () => {
    console.log("hihihi");
    try {
      const result: PetPreview[] = await this.knex<PetPreview>(TABLES.PETS)
      .select ("*", "organisations.name as organisation", 'pets.name as name', "pets.id as pet_id")
      .innerJoin (TABLES.ORGANISATIONS, "pets.organisation_id", "organisations.id")
  
      console.log(result)
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}