import type { Knex } from "knex";
import { ActivityDetail, ActivityPreview, Profile, User } from "../utils/models";
import { TABLES } from "../utils/tables";

export class ActivityService {
  constructor(private knex: Knex) {}

  getAllActivities = async () => {
    try {
      const result: ActivityPreview[] = await this.knex<ActivityPreview>(TABLES.ACTIVITIES)
        .select(
          "*",
          "organisations.name as organisation",
          "activities.name as activity",
          "activities.id as activity_id"
        )
        .innerJoin(TABLES.ORGANISATIONS, "activities.organisation_id", "organisations.id");
      // console.log(result, 'ActivityService.ts L18');
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  getActivityDetail = async (id: number) => {
    try {
      const result: ActivityDetail = await this.knex<ActivityDetail>(TABLES.ACTIVITIES)
        .select(
          "*",
          "organisations.name as organisation",
          "activities.name as activity",
          "activities.id as activity_id"
        )
        .innerJoin(TABLES.ORGANISATIONS, "activities.organisation_id", "organisations.id")
        .first()
        .where("activities.id", id);
      // console.log(result, "ActivityService.ts L37");
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  getActivitiesByCategory = async (type: string) => {
    try {
      const result: ActivityPreview[] = await this.knex<ActivityPreview>(TABLES.ACTIVITIES)
        .select(
          "*",
          "organisations.name as organisation",
          "activities.name as activity",
          "activities.id as activity_id"
        )
        .innerJoin(TABLES.ORGANISATIONS, "activities.organisation_id", "organisations.id")
        .where("activities.type", type);
      // console.log(result, "ActivityService.ts L56");
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  postActivityApplication = async (uid: number, activityId: number, user: Profile) => {
    // console.log("sir this way 1 ActivityService.ts L65");
    const trx = await this.knex.transaction();
    try {
      const isAppliedBefore = await this.knex(TABLES.ACTIVITY_APPLICATIONS)
        .select()
        .where("user_id", uid)
        .andWhere("activity_id", activityId)
        .first();
      // console.log(isAppliedBefore, "isApplied", "ActivityService.ts L73");
      // console.log(isAppliedBefore?.is_cancelled, "isCancelled", "ActivityService.ts L74");
      if (isAppliedBefore && !isAppliedBefore.is_cancelled) {
        // console.log("sir this way 2 ActivityService.ts L76");
        await trx.commit();
        return { message: "Applied before" };
      } else if (isAppliedBefore && isAppliedBefore.is_cancelled) {
        // console.log("sir this way 4");
        const userResult = await trx<User>(TABLES.USERS)
          .update(user)
          .update("updated_at", this.knex.fn.now())
          .where("id", uid)
          .returning("*");
        // console.log(userResult[0], "ActivityService.ts L86");
        const applicationResult = await trx(TABLES.ACTIVITY_APPLICATIONS)
          .update({
            is_cancelled: false,
            updated_at: new Date(),
          })
          .where("user_id", uid)
          .andWhere("activity_id", activityId)
          .returning("*");
        // console.log(applicationResult[0], "ActivityService.ts L95");
        await trx.commit();
        return { userResult: userResult[0], applicationResult: applicationResult[0] };
      } else {
        // console.log(user, "here  ActivityService.ts L99");
        const userResult = await trx<User>(TABLES.USERS)
          .update(user)
          .update("updated_at", this.knex.fn.now())
          .where("id", uid)
          .returning("*");
        // console.log(userResult[0], "ActivityService.ts L105");
        const applicationResult = await trx(TABLES.ACTIVITY_APPLICATIONS)
          .insert({
            user_id: uid,
            activity_id: activityId,
          })
          .returning("*");
        // console.log(applicationResult[0], "ActivityService.ts L112");
        await trx.commit();
        return { userResult: userResult[0], applicationResult: applicationResult[0] };
      }
    } catch (e) {
      console.log(e);
      await trx.rollback();
      throw e;
    }
  };

  putActivityApplication = async (uid: number, activityId: number) => {
    try {
      const result = await this.knex(TABLES.ACTIVITY_APPLICATIONS)
        .update({
          is_approved: false,
          is_cancelled: true,
          updated_at: new Date(),
        })
        .where("user_id", uid)
        .andWhere("activity_id", activityId)
        .returning("*");
      // console.log(result[0], "ActivityService.ts L134");
      return result[0];
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
