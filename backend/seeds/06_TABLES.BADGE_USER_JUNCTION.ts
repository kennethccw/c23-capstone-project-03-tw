import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("badge_user_junction").insert([
      {
        rank: "gold",
        year: 2022,
        badge_id: 1,
        user_id: 1,
      },
      {
        rank: "silver",
        year: 2022,
        badge_id: 3,
        user_id: 2,
      },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}
