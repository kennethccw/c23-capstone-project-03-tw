import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("onetime_payment_donations").insert([
      {
        receipt_name: "Ericlam",
        receipt_email: "Ericlam@gmail.com",
        receipt_mobile: 12345678,
        payment_method: "credit_card",
        donation_amount: 520,
        accept_recieve_edm: false,
        user_id: 1,
      },
      {
        receipt_name: "Kennethchan",
        receipt_email: "Kennethchan@gmail.com",
        receipt_mobile: 12345678,
        payment_method: "credit_card",
        donation_amount: 980,
        accept_recieve_edm: true,
        user_id: 2,
      },


    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}