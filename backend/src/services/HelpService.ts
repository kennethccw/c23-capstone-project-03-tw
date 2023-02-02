import type { Knex } from "knex";
import { ChatroomMessage, OrganisationChatroom } from "../utils/models";
import { TABLES } from "../utils/tables";

export class HelpService {
  constructor(private knex: Knex) {}

  getOrganisationChatroom = async (uid: number, organisation_id: number) => {
    try {
      const organisationResult = await this.knex<OrganisationChatroom>(TABLES.ORGANISATIONS)
        .select()
        .where("id", organisation_id)
        .first();
      const messageResult = await this.knex<ChatroomMessage>(TABLES.PET_SUPPORTS)
        .select()
        .where("user_id", uid)
        .andWhere("organisation_id", organisation_id);
      // .orderBy("id", "desc")
      // .limit(10);
      // console.log(messageResult);
      return { organisation: organisationResult, message: messageResult };
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  postClientTextChatroom = async (
    user_id: number,
    organisation_id: number,
    conversation: string
  ) => {
    try {
      const messageResult = await this.knex(TABLES.PET_SUPPORTS)
        .insert({
          user_id,
          organisation_id,
          conversation,
          role: "user",
        })
        .returning("*");
      return messageResult[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  postClientImageChatroom = async (user_id: number, organisation_id: number, image: string) => {
    try {
      const messageResult = await this.knex(TABLES.PET_SUPPORTS)
        .insert({
          user_id,
          organisation_id,
          image,
          role: "user",
        })
        .returning("*");
      return messageResult[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
