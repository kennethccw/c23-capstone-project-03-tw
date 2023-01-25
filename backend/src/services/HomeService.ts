import type { Knex } from "knex";
import { HomeActivity, HomeAdvertiser } from "../utils/models";
import { TABLES } from "../utils/tables";

export class HomeService {
  constructor(private knex: Knex) {}

  getHomeActivities = async () => {
    try {
      const result = await this.knex<HomeActivity>(TABLES.ACTIVITIES).select();
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

    const isUserExist = await this.knex(TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES)
      .select()
      .where("year", new Date().getFullYear())
      .andWhere(`${TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES}.user_id`, uid)
      .first();

    console.log(isUserExist);
    const isAdvertiserExist = await this.knex(TABLES.ADVERTISER_WATCHED_PER_YEAR)
      .select()
      .where("year", new Date().getFullYear())
      .andWhere(`${TABLES.ADVERTISER_WATCHED_PER_YEAR}.advertiser_id`, adsId)
      .first();
    console.log(isAdvertiserExist);

    try {
      if (isUserExist) {
        const userResult = await trx(TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES)
          .update("updated_at", this.knex.fn.now())
          .increment("total_advertising_watch_times", 1)
          .where("year", new Date().getFullYear())
          .andWhere(`${TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES}.user_id`, uid)
          .returning("*");
        if (isAdvertiserExist) {
          const adsResult = await trx(TABLES.ADVERTISER_WATCHED_PER_YEAR)
            .update("updated_at", this.knex.fn.now())
            .increment("total_watch_times", 1)
            .where("year", new Date().getFullYear())
            .andWhere(`${TABLES.ADVERTISER_WATCHED_PER_YEAR}.advertiser_id`, adsId)
            .returning("*");
          await trx.commit();
          return { userResult: userResult[0], adsResult: adsResult[0] };
        } else {
          const adsResult = await trx(TABLES.ADVERTISER_WATCHED_PER_YEAR)
            .insert({
              year: new Date().getFullYear(),
              total_watch_times: 1,
              advertiser_id: adsId,
            })
            .returning("*");
          await trx.commit();
          return { userResult: userResult[0], adsResult: adsResult[0] };
        }
      } else {
        const userResult = await trx(TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES)
          .insert({
            year: new Date().getFullYear(),
            total_advertising_watch_times: 1,
            user_id: uid,
          })
          .returning("*");
        console.log("sir this way");
        console.log(userResult);
        if (isAdvertiserExist) {
          const adsResult = await trx(TABLES.ADVERTISER_WATCHED_PER_YEAR)
            .update("updated_at", this.knex.fn.now())
            .increment("total_watch_times", 1)
            .where("year", new Date().getFullYear())
            .andWhere(`${TABLES.ADVERTISER_WATCHED_PER_YEAR}.advertiser_id`, adsId)
            .returning("*");

          await trx.commit();
          return { userResult: userResult[0], adsResult: adsResult[0] };
        } else {
          const adsResult = await trx(TABLES.ADVERTISER_WATCHED_PER_YEAR)
            .insert({
              year: new Date().getFullYear(),
              total_watch_times: 1,
              advertiser_id: adsId,
            })
            .returning("*");
          console.log(adsResult);
          await trx.commit();
          return { userResult: userResult[0], adsResult: adsResult[0] };
        }
      }
    } catch (e) {
      console.log(e);
      await trx.rollback();
      throw e;
    }
  };
}
