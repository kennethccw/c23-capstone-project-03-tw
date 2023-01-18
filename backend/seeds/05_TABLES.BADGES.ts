import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("badges").insert([
      {
        type: 'warmhearted',
      },
      {
        type: 'advertising_philanthropist',
      },
      {
        type: 'donation_philanthropist',
      },

    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
