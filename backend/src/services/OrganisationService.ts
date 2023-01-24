import type { Knex } from "knex";
import { OrganisationDetail, OrganisationList } from "../utils/models";
import { TABLES } from "../utils/tables";

export class OrganisationService {
  constructor(private knex: Knex) {}

  getOrganisationList = async () => {
    try {
      const result = await this.knex<OrganisationList>(TABLES.ORGANISATIONS).select();
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  getOrganisationDetail = async (id: number) => {
    try {
      const result = await this.knex<OrganisationDetail>(TABLES.ORGANISATIONS)
        .select()
        .where("id", id)
        .first();
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
