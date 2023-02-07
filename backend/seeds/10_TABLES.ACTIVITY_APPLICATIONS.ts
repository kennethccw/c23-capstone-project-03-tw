import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("activity_applications").insert([
      {
        is_approved: true,
        is_participated: true,
        is_cancelled: false,
        user_id: 1,
        activity_id: 1,
      },
      {
        is_approved: true,
        is_participated: true,
        is_cancelled: false,
        user_id: 2,
        activity_id: 2,
      },
      {
        is_approved: true,
        is_participated: true,
        is_cancelled: false,
        user_id: 45,
        activity_id: 4,
      },
      {
        is_approved: true,
        is_participated: true,
        is_cancelled: false,
        user_id: 45,
        activity_id: 6,
      },
      {
        is_approved: true,
        is_participated: true,
        is_cancelled: false,
        user_id: 45,
        activity_id: 10,
      },
      {
        is_approved: true,
        is_participated: false,
        is_cancelled: false,
        user_id: 45,
        activity_id: 12,
      },
      {
        is_approved: true,
        is_participated: false,
        is_cancelled: false,
        user_id: 45,
        activity_id: 17,
      },
      {
        is_approved: true,
        is_participated: false,
        is_cancelled: false,
        user_id: 45,
        activity_id: 15,
      },
      {
        is_approved: false,
        is_participated: false,
        is_cancelled: false,
        user_id: 2,
        activity_id: 3,
      },
      {
        is_approved: false,
        is_participated: false,
        is_cancelled: false,
        user_id: 22,
        activity_id: 3,
      },
      {
        is_approved: false,
        is_participated: false,
        is_cancelled: false,
        user_id: 21,
        activity_id: 3,
      },
      {
        is_approved: false,
        is_participated: false,
        is_cancelled: false,
        user_id: 19,
        activity_id: 3,
      },
      {
        is_approved: false,
        is_participated: false,
        is_cancelled: false,
        user_id: 20,
        activity_id: 3,
      },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e);
    await trx.rollback();
  }
}
