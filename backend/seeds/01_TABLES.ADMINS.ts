import type { Knex } from "knex";
import { hashPassword } from "../src/utils/hash";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("admins").insert([
      {
        username: "Kayaleung",
        email: "Kayaleung@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        gender: "female"
      },
      {
        username: "Kennethchan",
        email: "Kennethchan@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        gender: "male"
      },
      {
        username: "Ericlam",
        email: "Ericlam@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        gender: "male"
      },

    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}