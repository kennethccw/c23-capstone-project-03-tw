import type { Knex } from "knex";
import {
  ActivityParticipatedTimes,
  AdvertiserWatchedTimes,
  BadgeList,
  DonationAmount,
} from "../utils/models";
import { TABLES } from "../utils/tables";

export class BadgeService {
  constructor(private knex: Knex) {}

  getBadges = async (uid: number) => {
    const trx = await this.knex.transaction();
    try {
      const badges: BadgeList[] = await trx<BadgeList>(TABLES.BADGE_USER_JUNCTION)
        .select()
        .innerJoin(TABLES.BADGES, `${TABLES.BADGES}.id`, `${TABLES.BADGE_USER_JUNCTION}.badge_id`)
        .innerJoin(TABLES.USERS, `${TABLES.USERS}.id`, `${TABLES.BADGE_USER_JUNCTION}.user_id`)
        .where("users.id", uid)
        .andWhere(`${TABLES.BADGE_USER_JUNCTION}.year`, new Date().getFullYear());

      console.log(badges);

      const advertiserWatchedTimes = await trx<AdvertiserWatchedTimes>(
        TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES
      )
        .select()
        .where("user_id", uid)
        .andWhere(`${TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES}.year`, new Date().getFullYear())
        .first();
      const donationAmount = await trx<DonationAmount>(TABLES.USER_TOTAL_DONATIONS)
        .select()
        .where("user_id", uid)
        .andWhere(`${TABLES.USER_TOTAL_DONATIONS}.year`, new Date().getFullYear())
        .first();
      const activityParticipatedTimes = await trx<ActivityParticipatedTimes>(
        TABLES.USER_TOTAL_ACTIVITIES_PARTICIPATED_TIMES
      )
        .select()
        .where("user_id", uid)
        .andWhere(
          `${TABLES.USER_TOTAL_ACTIVITIES_PARTICIPATED_TIMES}.year`,
          new Date().getFullYear()
        )
        .first();
      await trx.commit();
      return { badges, advertiserWatchedTimes, donationAmount, activityParticipatedTimes };
    } catch (e) {
      console.log(e);
      await trx.rollback();
      throw e;
      // .innerJoin(
      //   TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES,
      //   `${TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES}.user_id`,
      //   `${TABLES.USERS}.id`
      // )
      // .innerJoin(
      //   TABLES.USER_TOTAL_DONATIONS,
      //   `${TABLES.USER_TOTAL_DONATIONS}.user_id`,
      //   `${TABLES.USERS}.id`
      // )
      // .innerJoin(
      //   TABLES.USER_TOTAL_ACTIVITIES_PARTICIPATED_TIMES,
      //   `${TABLES.USER_TOTAL_ACTIVITIES_PARTICIPATED_TIMES}.user_id`,
      //   `${TABLES.USERS}.id`
      // )
    }
  };
}
