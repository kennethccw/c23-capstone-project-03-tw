import { Knex } from "knex";
import { ScheduleActivity } from "../utils/models";
import { TABLES } from "../utils/tables";

export class ApprovalActivityService {
  constructor(private knex: Knex) {}

  getPendingApplication = async (organisationId: number) => {
    try {
      const result: ScheduleActivity[] = await this.knex(TABLES.ACTIVITY_APPLICATIONS)
        .select()
        .where("is_approved", false)
        .andWhere("organisation_id", organisationId)
        .innerJoin(
          TABLES.ACTIVITIES,
          `${TABLES.ACTIVITIES}.id`,
          `${TABLES.ACTIVITY_APPLICATIONS}.activity_id`
        );
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
