import type { Knex } from "knex";
import { Auth, User } from "../utils/models";
import { TABLES } from "../utils/tables";

export class UserService {
  constructor(private knex: Knex) {}

  register = async (user: User) => {
    const isOrganisationEmail = await this.knex(TABLES.ORGANISATIONS)
      .select()
      .where("email", user.email)
      .first();

    if (isOrganisationEmail) {
      return;
    }
    try {
      const result = await this.knex<User>(TABLES.USERS)
        .insert(user)
        .returning(["id", "username"])
        .returning("*");
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  loginWithEmail = async (email: string) => {
    const trx = await this.knex.transaction();
    try {
      console.log("loginWithEmail");
      const userResult: Auth = await trx(TABLES.USERS)
        .select("id", "username", "password")
        .where("email", email)
        .first();
      // console.log(result);
      const oldOrganisationResult: Auth = await trx(TABLES.ORGANISATIONS)
        .select("id", "name", "password")
        .where("email", email)
        .first();

      const { id, name: username, password } = oldOrganisationResult;
      const organisationResult = { id, username, password };
      await trx.commit();
      return { userResult, organisationResult };
    } catch (e) {
      console.log("there is error");
      console.log(e);
      await trx.rollback();
      throw e;
    }
  };

  loginWithUsername = async (username: string) => {
    try {
      const result: Auth = await this.knex(TABLES.USERS)
        .select("id", "username", "password")
        .where("username", username)
        .first();
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  verifyUser = async (uid: number) => {
    try {
      const result: Auth = await this.knex(TABLES.USERS)
        .select("id", "username", "email")
        .where("id", uid)
        .first();
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  getProfile = async (uid: number) => {
    try {
      const result: User = await this.knex(TABLES.USERS).select().where("id", uid).first();
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  editProfile = async (uid: number, user: User) => {
    try {
      const result = await this.knex<User>(TABLES.USERS)
        .update(user)
        .update("updated_at", this.knex.fn.now())
        .where("id", uid)
        .returning("*");
      return result[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  changePassword = async (uid: number, password: string) => {
    try {
      console.log("here is database");
      const result = await this.knex(TABLES.USERS)
        .update({ password })
        .update("updated_at", this.knex.fn.now())
        .where("id", uid)
        .returning("*");
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
