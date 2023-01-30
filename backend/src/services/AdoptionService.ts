import type { Knex } from "knex";
import { PetDetail } from "../utils/models";
import { TABLES } from "../utils/tables";

export class AdoptionService {
  constructor (private knex: Knex) {}
  
  getPetAdoption = async (id: number) => {
    console.log("hihihi");
    try {
      const result: PetDetail = await this.knex<PetDetail>(TABLES.PETS)
      .select ("*", "organisation.name as organisation")
      .innerJoin (TABLES.ORGANISATIONS, "pets.organisation_id", "organisation_id")
      .first ()
      .where ("pets.id", id);
      console.log(result)
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
//   getPetAdoption = async (id: number) => {
//     console.log("hihihi");
//     try {
//       const result: PetDetail = await this.knex<PetDetail>(TABLES.PETS)
//       .select ("*", "organisation.name as organisation")
//       .innerJoin (TABLES.ORGANISATIONS, "pets.organisation_id", "organisation_id")
//       .first ()
//       .where ("pets.id", id);
//       console.log(result)
//       return result;
//     } catch (e) {
//       console.log(e);
//       throw e;
//     }
//   }
}