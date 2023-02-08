import type { Knex } from "knex";
import { ScheduleActivity } from "../utils/models";
import { TABLES } from "../utils/tables";

export class ScheduleService {
  constructor(private knex: Knex) {}

  getScheduleActivities = async (uid: number) => {
    console.log(uid);
    try {
      const confirmedActivities = await this.knex<ScheduleActivity>(TABLES.ACTIVITY_APPLICATIONS)
        .select(
          "*",
          "organisations.name as organisation",
          "activities.name as activity",
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
        .andWhere("activity_applications.is_approved", true)
        .andWhere("activity_applications.is_cancelled", false)
        .andWhere("activity_applications.is_rejected", false);
      const pendingActivities = await this.knex<ScheduleActivity>(TABLES.ACTIVITY_APPLICATIONS)
        .select(
          "*",
          "organisations.name as organisation",
          "activities.name as activity",
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
        .andWhere("activity_applications.is_approved", false)
        .andWhere("activity_applications.is_cancelled", false)
        .andWhere("activity_applications.is_rejected", false);
      // console.log(confirmedActivities, pendingActivities);
      return { confirmed: confirmedActivities, pending: pendingActivities };
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
