import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("it_supports").insert([
      {
        conversation: "申請義工個制禁唔到",
        status: "completed",
        admin_id: 1,
        organisation_id: 1,
      },
      {
        conversation: "SET左義工名額有10個人，但收到12個人報名3月5日個義工活動",
        status: "pending",
        admin_id: 2,
        organisation_id: 2,
      },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}
