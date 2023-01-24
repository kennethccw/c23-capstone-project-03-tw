import type { Knex } from "knex";
import { HomeActivity } from "../utils/models";
import { TABLES } from "../utils/tables";

export class HomeService {
  constructor(private knex: Knex) {}

  getHomeActivities = async () => {
    try {
      const result = await this.knex<HomeActivity>(TABLES.ACTIVITIES).select();
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
