import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("advertisers").insert([
      {
        media: "adv-15s.png",
        link: "http://www.garden.com.hk/cht/home",
      },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}
