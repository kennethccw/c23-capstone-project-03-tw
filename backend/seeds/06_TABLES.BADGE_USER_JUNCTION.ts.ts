import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("badge_user_junction").insert([
      {

       year: "2022",
       badge: "",
      },

    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
