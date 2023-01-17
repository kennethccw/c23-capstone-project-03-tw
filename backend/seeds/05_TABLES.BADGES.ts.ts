import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("badges").insert([
      {

      },

    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
