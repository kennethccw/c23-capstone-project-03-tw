import { Knex } from "knex";
import { ActivityApproval, ScheduleActivity } from "../utils/models";
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
        .andWhere(`${TABLES.ACTIVITY_APPLICATIONS}.is_rejected`, false)
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
  putPendingApplication = async (organisationId: number, applicationArr: ActivityApproval[]) => {
    const trx = await this.knex.transaction();
    try {
      const resultArr = [];
      for (const application of applicationArr) {
        if (application.is_approved) {
          const result = await trx(TABLES.ACTIVITY_APPLICATIONS)
            .update({ is_approved: true, updated_at: new Date() })
            .where("user_id", application.user_id)
            .andWhere("activity_id", application.activity_id)
            .returning("*");
          const activityName = await trx(TABLES.ACTIVITIES)
            .select("name")
            .where("id", application.activity_id);
          resultArr.push(result[0]);
          const notificationResult = await trx(TABLES.NOTIFICATION)
            .insert({
              type: "activity",
              content: `${activityName[0].name}的活動申請已獲接納`,
              any_id: application.activity_id,
              user_id: application.user_id,
            })
            .returning("*");
          resultArr.push(notificationResult[0]);
        }
        if (application.is_rejected) {
          const result = await trx(TABLES.ACTIVITY_APPLICATIONS)
            .update({ is_rejected: true, updated_at: new Date() })
            .where("user_id", application.user_id)
            .andWhere("activity_id", application.activity_id)
            .returning("*");
          resultArr.push(result[0]);
        }
      }
      await trx.commit();
      return resultArr;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  getApprovedApplication = async (organisationId: number) => {
    try {
      const result: ScheduleActivity[] = await this.knex(TABLES.ACTIVITY_APPLICATIONS)
        .select(
          "*",
          `${TABLES.ACTIVITIES}.id as activity_id`,
          `${TABLES.ACTIVITIES}.image as image`,
          `${TABLES.ACTIVITIES}.name as activity`,
          `${TABLES.USERS}.fullname as user_fullname`
        )
        .where(`${TABLES.ACTIVITY_APPLICATIONS}.is_approved`, true)
        .andWhere(`${TABLES.ACTIVITIES}.organisation_id`, organisationId)
        .innerJoin(
          TABLES.ACTIVITIES,
          `${TABLES.ACTIVITIES}.id`,
          `${TABLES.ACTIVITY_APPLICATIONS}.activity_id`
        )
        .innerJoin(TABLES.USERS, `${TABLES.USERS}.id`, `${TABLES.ACTIVITY_APPLICATIONS}.user_id`);
      console.log(result, "ApprovalActivityService.ts L53");
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
