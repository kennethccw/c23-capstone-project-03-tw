import type { Knex } from "knex";
import { ChatroomMessage, OrganisationChatroom, SupportPanel } from "../utils/models";
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
  getSupportPanel = async (organisation_id: number) => {
    try {
      const messageResult: SupportPanel[] = await this.knex(TABLES.PET_SUPPORTS)
        .select()
        .where("organisation_id", organisation_id)
        .andWhere("status", "pending")
        .innerJoin(TABLES.USERS, `${TABLES.USERS}.id`, `${TABLES.PET_SUPPORTS}.user_id`);
      // .orderBy("id", "desc")
      // .limit(10);
      // console.log(messageResult);
      return messageResult;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  getUserChatroom = async (organisation_id: number, uid: number) => {
    try {
      console.log("get user chatroom");
      const userResult = await this.knex<string>(TABLES.USERS)
        .select("username")
        .where("id", uid)
        .first();
      const messageResult = await this.knex<ChatroomMessage>(TABLES.PET_SUPPORTS)
        .select()
        .where("user_id", uid)
        .andWhere("organisation_id", organisation_id);
      // .orderBy("id", "desc")
      // .limit(10);
      // console.log(messageResult);
      const { username } = userResult;
      return { user: username, message: messageResult };
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
      const user = await this.knex(TABLES.USERS)
        .select("username")
        .where("id", messageResult[0].user_id)
        .first();
      return { message: messageResult[0], user };
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
      const user = await this.knex(TABLES.USERS)
        .select("username")
        .where("id", messageResult[0].user_id)
        .first();
      return { message: messageResult[0], user };
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  postSupportTextChatroom = async (
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
          role: "organisation",
        })

        .returning("*");
      const organisation = await this.knex(TABLES.ORGANISATIONS)
        .select("name")
        .where("id", messageResult[0].organisation_id)
        .first();
      return { message: messageResult[0], organisation };
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  postSupportImageChatroom = async (user_id: number, organisation_id: number, image: string) => {
    try {
      const messageResult = await this.knex(TABLES.PET_SUPPORTS)
        .insert({
          user_id,
          organisation_id,
          image,
          role: "organisation",
        })
        .returning("*");
      const organisation = await this.knex(TABLES.ORGANISATIONS)
        .select("name")
        .where("id", messageResult[0].organisation_id)
        .first();
      return { message: messageResult[0], organisation };
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  notification = async (uid: number, name: string, organisationId: number) => {
    try {
      const isAppeared = await this.knex(TABLES.NOTIFICATION)
        .where("type", "message")
        .andWhere("user_id", uid)
        .andWhere("any_id", organisationId)
        .first();
      if (isAppeared) {
        const result = await this.knex(TABLES.NOTIFICATION)
          .update("updated_at", new Date())
          .increment("count", 1)
          .where("type", "message")
          .andWhere("user_id", uid)
          .andWhere("any_id", organisationId)
          .returning("*");
        return result[0];
      }
      const result = await this.knex(TABLES.NOTIFICATION)
        .insert({ type: "message", user_id: uid, content: name, count: 1, any_id: organisationId })
        .returning("*");
      return result[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
