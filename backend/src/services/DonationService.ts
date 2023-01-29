import type { Knex } from "knex";
import { Donation } from "../utils/models";
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
      if (isDonatedThisYear) {
        totalDonationThisYear = await trx(TABLES.USER_TOTAL_DONATIONS)
          .update({ updated_at: new Date() })
          .increment("total_donation", donation_amount)
          .where("user_id", uid)
          .andWhere("year", new Date().getFullYear())
          .returning("*");
      } else {
        totalDonationThisYear = await trx(TABLES.USER_TOTAL_DONATIONS)
          .insert({ total_donation: donation_amount, year: new Date().getFullYear() })
          .returning("*");
      }
      const onetimeDonation = await trx<Donation>(TABLES.ONETIME_PAYMENT_DONATIONS)
        .insert(donation)
        .returning("*");
      await trx.commit();
      return {
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
