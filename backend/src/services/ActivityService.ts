import type { Knex } from "knex";
import { ActivityDetail, Profile, User } from "../utils/models";
import { TABLES } from "../utils/tables";

export class ActivityService {
  constructor(private knex: Knex) {}

  getActivityDetail = async (id: number) => {
    console.log("hihhi");
    try {
      const result: ActivityDetail = await this.knex<ActivityDetail>(TABLES.ACTIVITIES)
        .select("*", "organisations.name as organisation")
        .innerJoin(TABLES.ORGANISATIONS, "activities.organisation_id", "organisations.id")
        .first()
        .where("activities.id", id);
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  postActivityApplication = async (uid: number, activityId: number, user: Profile) => {
    console.log("hihhi");
    console.log(uid, activityId);
    const trx = await this.knex.transaction();
    const isAppliedBefore = await this.knex(TABLES.ACTIVITY_APPLICATIONS)
      .select()
      .where("user_id", uid)
      .andWhere("activity_id", activityId)
      .first();
    console.log(isAppliedBefore);
    if (isAppliedBefore) {
      console.log("sir this way");
      return { message: "Applied before" };
    }
    try {
      const userResult = await trx<User>(TABLES.USERS)
        .update(user)
        .update("updated_at", this.knex.fn.now())
        .where("id", uid)
        .returning("*");
      console.log(userResult[0]);
      const applicationResult = await trx(TABLES.ACTIVITY_APPLICATIONS)
        .insert({
          user_id: uid,
          activity_id: activityId,
        })
        .returning("*");
      console.log(applicationResult[0]);
      await trx.commit();
      return { userResult: userResult[0], applicationResult: applicationResult[0] };
    } catch (e) {
      console.log(e);
      await trx.rollback();
      throw e;
    }
  };
}
