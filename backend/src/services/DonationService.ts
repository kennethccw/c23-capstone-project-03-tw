import type { Knex } from "knex";
import { BadgeRank, BadgeType, Donation, NotificationType } from "../utils/models";
import { TABLES } from "../utils/tables";

export class DonationService {
  constructor(private knex: Knex) {}

  putDonationSubmition = async (uid: number, donation: Donation) => {
    const trx = await this.knex.transaction();
    try {
      const { donation_amount } = donation;
      const isDonatedThisYear = await this.knex(TABLES.USER_TOTAL_DONATIONS)
        .select()
        .where("user_id", uid)
        .andWhere("year", new Date().getFullYear())
        .first();

      let totalDonationThisYear;
      let badgeThisYear;
      if (isDonatedThisYear) {
        totalDonationThisYear = await trx(TABLES.USER_TOTAL_DONATIONS)
          .update({ updated_at: new Date() })
          .increment("total_donation", donation_amount)
          .where("user_id", uid)
          .andWhere("year", new Date().getFullYear())
          .returning("*");
        if (totalDonationThisYear[0].total_donation > 1000) {
          badgeThisYear = await trx(TABLES.BADGE_USER_JUNCTION)
            .update({
              updated_at: new Date(),
              rank: BadgeRank.gold,
            })
            .where("user_id", uid)
            .andWhere("badge_id", BadgeType.donation_philanthropist)
            .andWhere("year", new Date().getFullYear())
            .returning("*");
          await trx(TABLES.NOTIFICATION).insert({
            type: NotificationType.badge,
            content: "恭喜！剛剛捐款慈善家徽章升級成金徽章了！",
            user_id: uid,
          });
        } else if (totalDonationThisYear[0].total_donation > 500) {
          badgeThisYear = await trx(TABLES.BADGE_USER_JUNCTION)
            .update({
              updated_at: new Date(),
              rank: BadgeRank.silver,
            })
            .where("user_id", uid)
            .andWhere("badge_id", BadgeType.donation_philanthropist)
            .andWhere("year", new Date().getFullYear())
            .returning("*");
          await trx(TABLES.NOTIFICATION).insert({
            type: NotificationType.badge,
            content: "恭喜！剛剛捐款慈善家徽章升級成銀徽章了！",
            user_id: uid,
          });
        } else {
          badgeThisYear = await this.knex(TABLES.BADGE_USER_JUNCTION)
            .select()
            .where("user_id", uid)
            .andWhere("year", new Date().getFullYear());
        }
      } else {
        totalDonationThisYear = await trx(TABLES.USER_TOTAL_DONATIONS)
          .insert({ user_id: uid, total_donation: donation_amount, year: new Date().getFullYear() })
          .returning("*");
        badgeThisYear = await trx(TABLES.BADGE_USER_JUNCTION)
          .insert({
            user_id: uid,
            badge_id: BadgeType.donation_philanthropist,
            rank: BadgeRank.copper,
            year: new Date().getFullYear(),
          })
          .returning("*");
        await trx(TABLES.NOTIFICATION).insert({
          type: NotificationType.badge,
          content: "恭喜！剛剛獲得了捐款慈善家銅徽章！",
          user_id: uid,
        });
      }
      const onetimeDonation = await trx<Donation>(TABLES.ONETIME_PAYMENT_DONATIONS)
        .insert(donation)
        .returning("*");
      await trx.commit();
      return {
        badgeThisYear: badgeThisYear[0],
        onetimeDonation: onetimeDonation[0],
        totalDonationThisYear: totalDonationThisYear[0],
      };
    } catch (e) {
      console.log(e);
      await trx.rollback();
      throw e;
    }
  };
}
