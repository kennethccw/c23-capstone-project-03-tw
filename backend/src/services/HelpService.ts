import type { Knex } from "knex";
import { OrganisationChatroom } from "../utils/models";
import { TABLES } from "../utils/tables";

export class HelpService {
  constructor(private knex: Knex) {}

  getOrganisationChatroom = async (_uid: number, organisation_id: number) => {
    try {
      const result = await this.knex<OrganisationChatroom>(TABLES.ORGANISATIONS)
        .select()
        .where("id", organisation_id)
        .first();
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
