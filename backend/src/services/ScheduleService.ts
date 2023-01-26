import type { Knex } from "knex";
import { ScheduleActivity } from "../utils/models";
import { TABLES } from "../utils/tables";

export class ScheduleService {
  constructor(private knex: Knex) {}

  getScheduleActivities = async (uid: number) => {
    const trx = await this.knex.transaction();
    console.log(uid);
    try {
      const confirmedActivities = await trx<ScheduleActivity>(TABLES.ACTIVITY_APPLICATIONS)
        .select(
          "*",
          "organisations.name as organisation",
          "activity_applications.id as application_id"
        )
        .innerJoin(
          TABLES.ACTIVITIES,
          `${TABLES.ACTIVITIES}.id`,
          `${TABLES.ACTIVITY_APPLICATIONS}.activity_id`
        )
        .innerJoin(
          TABLES.ORGANISATIONS,
          `${TABLES.ACTIVITIES}.organisation_id`,
          `${TABLES.ORGANISATIONS}.id`
        )
        .where("activity_applications.user_id", uid)
        .andWhere("activity_applications.is_approved", true);
      const pendingActivities = await trx<ScheduleActivity>(TABLES.ACTIVITY_APPLICATIONS)
        .select(
          "*",
          "organisations.name as organisation",
          "activity_applications.id as application_id"
        )
        .innerJoin(
          TABLES.ACTIVITIES,
          `${TABLES.ACTIVITIES}.id`,
          `${TABLES.ACTIVITY_APPLICATIONS}.activity_id`
        )
        .innerJoin(
          TABLES.ORGANISATIONS,
          `${TABLES.ACTIVITIES}.organisation_id`,
          `${TABLES.ORGANISATIONS}.id`
        )
        .where("activity_applications.user_id", uid)
        .andWhere("activity_applications.is_approved", false);
      await trx.commit();
      console.log(confirmedActivities, pendingActivities);
      return { confirmed: confirmedActivities, pending: pendingActivities };
    } catch (e) {
      console.log(e);
      await trx.rollback();
      throw e;
    }
  };
}
