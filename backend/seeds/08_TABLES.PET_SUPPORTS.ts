import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("it_supports").insert([
      {
        conversation: "我地係元朗洪水橋洪天路貨倉見到一隻狗女，此狗女我每天也有去餵她的，已有一個星期。",
        status: "pending", 
        user_id: 1,
        organisation_id: 1,
      },
      {
        conversation: "昨天有人發現這小朋友, 於大埔某村內徘徊, 明顯地是一位年紀很大的小毛孩。在頸上亦發現1個，很大的傷口",
        status: "completed", 
        user_id: 2,
        organisation_id: 1,
      },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}
