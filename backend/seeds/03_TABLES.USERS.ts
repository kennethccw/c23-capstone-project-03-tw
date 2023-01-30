import type { Knex } from "knex";
import { hashPassword } from "../src/utils/hash";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("users").insert([
      {
        username: "lovepetuser01",
        email: "lovepetuser01@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-1997",
        gender: "female",
        is_experienced: false,
      },
      {
        username: "lovepetuser02",
        email: "lovepetuser02@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-1993",
        gender: "male",
        is_experienced: true,
      },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}