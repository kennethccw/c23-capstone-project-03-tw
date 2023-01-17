// import type { Knex } from "knex";

// export async function seed(knex: Knex): Promise<void> {
//   // Inserts seed entries
//   const trx = await knex.transaction();
//   try {
//     await trx("advertisers").insert([
//       {
//         media_path : "frontend/public/photos/adv-15s.jpeg",
//         lnik : "",

//       },

//     ]);
//     await trx.commit();
//   } catch (e) {
//     await trx.rollback();
//   }
// }