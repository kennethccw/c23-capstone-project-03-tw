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
        .select()
        .innerJoin(
          TABLES.ACTIVITIES,
          `${TABLES.ACTIVITIES}.id`,
          `${TABLES.ACTIVITY_APPLICATIONS}.activity_id`
        )
        .where("user_id", uid)
        .andWhere("is_approved", true);
      const pendingActivities = await trx<ScheduleActivity>(TABLES.ACTIVITY_APPLICATIONS)
        .select()
        .innerJoin(
          TABLES.ACTIVITIES,
          `${TABLES.ACTIVITIES}.id`,
          `${TABLES.ACTIVITY_APPLICATIONS}.activity_id`
        )
        .where("user_id", uid)
        .andWhere("is_approved", false);
      await trx.commit();
      return { confirmed: confirmedActivities, pending: pendingActivities };
    } catch (e) {
      console.log(e);
      await trx.rollback();
      throw e;
    }
  };
}
