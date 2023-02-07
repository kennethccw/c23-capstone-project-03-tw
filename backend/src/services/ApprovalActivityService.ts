import { Knex } from "knex";
import { ScheduleActivity } from "../utils/models";
import { TABLES } from "../utils/tables";

export class ApprovalActivityService {
  constructor(private knex: Knex) {}

  getPendingApplication = async (organisationId: number) => {
    try {
      const result: ScheduleActivity[] = await this.knex(TABLES.ACTIVITY_APPLICATIONS)
        .select(
          "*",
          `${TABLES.ACTIVITIES}.id as activity_id`,
          `${TABLES.ACTIVITIES}.image as image`,
          `${TABLES.ACTIVITIES}.name as activity`,
          `${TABLES.USERS}.fullname as user_fullname`
        )
        .where(`${TABLES.ACTIVITY_APPLICATIONS}.is_approved`, false)
        .andWhere(`${TABLES.ACTIVITIES}.organisation_id`, organisationId)
        .innerJoin(
          TABLES.ACTIVITIES,
          `${TABLES.ACTIVITIES}.id`,
          `${TABLES.ACTIVITY_APPLICATIONS}.activity_id`
        )
        .innerJoin(TABLES.USERS, `${TABLES.USERS}.id`, `${TABLES.ACTIVITY_APPLICATIONS}.user_id`);
      console.log(result, "ApprovalActivityService.ts L26");
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
