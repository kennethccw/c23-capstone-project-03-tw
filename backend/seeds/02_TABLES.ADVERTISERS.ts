import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("advertisers").insert([
      {
        media_path : "frontend/public/photos/adv-15s.jpeg",
        link : "http://www.garden.com.hk/cht/home",
        total_clicked_ads_times_per_year: 0,
        total_watched_ads_times_per_year: 0,
      },

    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}