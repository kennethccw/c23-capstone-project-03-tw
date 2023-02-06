import type { Knex } from "knex";
import { VolunteerRecord } from "../utils/models";
import { TABLES } from "../utils/tables";

export class VolunteerRecordService {
  constructor(private knex: Knex) {}

  getVolunteerHistory = async (uid: number) => {
    try {
      console.log(uid);
      const onBoardResult: { created_at: Date } = await this.knex(TABLES.USERS)
        .select("created_at")
        .where("id", uid)
        .first();
      const onBoardDate = onBoardResult.created_at;
      console.log(onBoardDate);
      const participatedResult: VolunteerRecord[] = await this.knex(TABLES.ACTIVITY_APPLICATIONS)
        .select(
          `${TABLES.ACTIVITIES}.name as activity_name`,
          `${TABLES.ACTIVITIES}.date as activity_date`,
          `${TABLES.ACTIVITIES}.start_time as activity_start_time`,
          `${TABLES.ACTIVITIES}.end_time as activity_end_time`
        )
        .innerJoin(
          TABLES.ACTIVITIES,
          `${TABLES.ACTIVITIES}.id`,
          `${TABLES.ACTIVITY_APPLICATIONS}.activity_id`
        )
        .orderBy(`${TABLES.ACTIVITIES}.date`, "asc")
        .where(`${TABLES.ACTIVITY_APPLICATIONS}.user_id`, uid)
        .andWhere(`${TABLES.ACTIVITY_APPLICATIONS}.is_participated`, true);
      const approvedResult: VolunteerRecord[] = await this.knex(TABLES.ACTIVITY_APPLICATIONS)
        .select(
          `${TABLES.ACTIVITIES}.name as activity_name`,
          `${TABLES.ACTIVITIES}.date as activity_date`,
          `${TABLES.ACTIVITIES}.start_time as activity_start_time`,
          `${TABLES.ACTIVITIES}.end_time as activity_end_time`
        )
        .innerJoin(
          TABLES.ACTIVITIES,
          `${TABLES.ACTIVITIES}.id`,
          `${TABLES.ACTIVITY_APPLICATIONS}.activity_id`
        )
        .orderBy(`${TABLES.ACTIVITIES}.date`, "asc")
        .where(`${TABLES.ACTIVITY_APPLICATIONS}.user_id`, uid)
        .andWhere(`${TABLES.ACTIVITY_APPLICATIONS}.is_approved`, true)
        .andWhere(`${TABLES.ACTIVITY_APPLICATIONS}.is_participated`, false);
      return { onBoardDate, approvedResult, participatedResult };
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
