import type { Knex } from "knex";
import {
  BadgeRank,
  BadgeType,
  HomeActivity,
  HomeAdvertiser,
  NotificationType,
} from "../utils/models";
import { TABLES } from "../utils/tables";

export class HomeService {
  constructor(private knex: Knex) {}

  getHomeActivities = async () => {
    try {
      const result = await this.knex<HomeActivity>(TABLES.ACTIVITIES)
        .select()
        .where("activities.date", ">", new Date())
        .orderBy(`${TABLES.ACTIVITIES}.date`, "asc");
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  getHomeAdvertisers = async () => {
    try {
      const result = await this.knex<HomeAdvertiser>(TABLES.ADVERTISERS).select();
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  postHomeAdvertiser = async (uid: number, adsId: number) => {
    const trx = await this.knex.transaction();
    let badgeResult;
    try {
      const isUserRecordExist = await this.knex(TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES)
        .select()
        .where("year", new Date().getFullYear())
        .andWhere(`${TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES}.user_id`, uid)
        .first();

      console.log(isUserRecordExist);
      const isAdvertiserRecordExist = await this.knex(TABLES.ADVERTISER_WATCHED_PER_YEAR)
        .select()
        .where("year", new Date().getFullYear())
        .andWhere(`${TABLES.ADVERTISER_WATCHED_PER_YEAR}.advertiser_id`, adsId)
        .first();
      console.log(isAdvertiserRecordExist);

      if (isUserRecordExist) {
        const userRecordResult = await trx(TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES)
          .update("updated_at", this.knex.fn.now())
          .increment("total_advertising_watch_times", 1)
          .where("year", new Date().getFullYear())
          .andWhere(`${TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES}.user_id`, uid)
          .returning("*");
        if (userRecordResult[0]["total_advertising_watch_times"] > 20) {
          badgeResult = await trx(TABLES.BADGE_USER_JUNCTION)
            .update({
              rank: BadgeRank.gold,
              updated_at: new Date(),
            })
            .where("badge_id", BadgeType.advertising_philanthropist)
            .andWhere("user_id", uid)
            .andWhere("year", new Date().getFullYear())
            .returning("*");
          await trx(TABLES.NOTIFICATION).insert({
            type: NotificationType.badge,
            content: "恭喜！剛剛廣告慈善家徽章升級成金徽章了！",
            user_id: uid,
          });
        } else if (userRecordResult[0]["total_advertising_watch_times"] > 10) {
          badgeResult = await trx(TABLES.BADGE_USER_JUNCTION)
            .update({
              rank: BadgeRank.silver,
              updated_at: new Date(),
            })
            .where("badge_id", BadgeType.advertising_philanthropist)
            .andWhere("year", new Date().getFullYear())
            .andWhere("user_id", uid)
            .returning("*");
          await trx(TABLES.NOTIFICATION).insert({
            type: NotificationType.badge,
            content: "恭喜！剛剛廣告慈善家徽章升級成銀徽章了！",
            user_id: uid,
          });
        }
        console.log(badgeResult);
        if (isAdvertiserRecordExist) {
          const adsRecordResult = await trx(TABLES.ADVERTISER_WATCHED_PER_YEAR)
            .update("updated_at", this.knex.fn.now())
            .increment("total_watch_times", 1)
            .where("year", new Date().getFullYear())
            .andWhere(`${TABLES.ADVERTISER_WATCHED_PER_YEAR}.advertiser_id`, adsId)
            .returning("*");
          await trx.commit();
          return {
            badgeReuslt: badgeResult && badgeResult[0],
            userRecordResult: userRecordResult[0],
            adsRecordResult: adsRecordResult[0],
          };
        } else {
          const adsRecordResult = await trx(TABLES.ADVERTISER_WATCHED_PER_YEAR)
            .insert({
              year: new Date().getFullYear(),
              total_watch_times: 1,
              advertiser_id: adsId,
            })
            .returning("*");
          await trx.commit();
          return {
            badgeReuslt: badgeResult && badgeResult[0],
            userRecordResult: userRecordResult[0],
            adsRecordResult: adsRecordResult[0],
          };
        }
      } else {
        const userRecordResult = await trx(TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES)
          .insert({
            year: new Date().getFullYear(),
            total_advertising_watch_times: 1,
            user_id: uid,
          })
          .returning("*");
        console.log("sir this way");
        console.log(userRecordResult);
        const badgeResult = await trx(TABLES.BADGE_USER_JUNCTION)
          .insert({
            rank: BadgeRank.copper,
            year: new Date().getFullYear(),
            badge_id: BadgeType.advertising_philanthropist,
            user_id: uid,
          })
          .returning("*");
        await trx(TABLES.NOTIFICATION).insert({
          type: NotificationType.badge,
          content: "恭喜！剛剛獲得了廣告慈善家銅徽章！",
          user_id: uid,
        });
        console.log(badgeResult);
        if (isAdvertiserRecordExist) {
          const adsRecordResult = await trx(TABLES.ADVERTISER_WATCHED_PER_YEAR)
            .update("updated_at", this.knex.fn.now())
            .increment("total_watch_times", 1)
            .where("year", new Date().getFullYear())
            .andWhere(`${TABLES.ADVERTISER_WATCHED_PER_YEAR}.advertiser_id`, adsId)
            .returning("*");

          await trx.commit();
          return {
            badgeReuslt: badgeResult[0],
            userRecordResult: userRecordResult[0],
            adsRecordResult: adsRecordResult[0],
          };
        } else {
          const adsRecordResult = await trx(TABLES.ADVERTISER_WATCHED_PER_YEAR)
            .insert({
              year: new Date().getFullYear(),
              total_watch_times: 1,
              advertiser_id: adsId,
            })
            .returning("*");
          console.log(adsRecordResult);
          await trx.commit();
          return {
            badgeReuslt: badgeResult[0],
            userRecordResult: userRecordResult[0],
            adsRecordResult: adsRecordResult[0],
          };
        }
      }
    } catch (e) {
      console.log(e);
      await trx.rollback();
      throw e;
    }
  };

  getNotification = async (uid: number) => {
    try {
      const result = await this.knex(TABLES.NOTIFICATION).select().where("user_id", uid);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  deleteNotification = async (notificationId: number) => {
    try {
      await this.knex(TABLES.NOTIFICATION).delete().where("id", notificationId);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
