import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("user_total_activities_participated_times").insert([
      {
        total_activities_participated_times: 0,
        year: 2023,
        user_id: 1,
      },
      {
        total_activities_participated_times: 0,
        year: 2023,
        user_id: 2,
      },

    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}