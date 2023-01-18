import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("user_total_advertising_watch_times").insert([
      {
        total_advertising_watch_times: 4,
        year: 2022,
        user_id: 1,
      },
      {
        total_advertising_watch_times: 6,
        year: 2022,
        user_id: 2,
      },
    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}