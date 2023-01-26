import type { Knex } from "knex";
import { hashPassword } from "../src/utils/hash";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("organisations").insert([
      {
        logo: "organisation1.png",
        name: "香港動物群益會",
        email: "hkaca01@gmail.com",
        password: await hashPassword("12345678"),
        mobile: "25272527",
        address: "香港旺角駱克道三號",
      },
      {
        logo: "organisation2.png",
        name: "保護動物協會",
        email: "volunteer02@protectanimal.org.hk",
        password: await hashPassword("12345678"),
        mobile: "28002800",
        address: "香港灣仔中心 (總部)",
      },
      {
        logo: "organisation4.png",
        name: "保護遺棄貓狗協會",
        email: "pcd03@pcd.org.hk",
        password: await hashPassword("12345678"),
        mobile: "28382838",
        address: "新界元朗僑興路白沙村第一段",
      },

      {
        logo: "organisation3.png",
        name: "香港關愛庇護動物之家",
        email: "volunteer.lovepet04@gmail.com",
        password: await hashPassword("12345678"),
        mobile: "28426812",
        address: "新界屯門屏山鄉后海灣濱",
      },
    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
