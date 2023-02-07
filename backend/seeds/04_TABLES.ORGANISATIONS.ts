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
        district_org: "kowloon",
      },
      {
        logo: "organisation2.png",
        name: "保護動物協會",
        email: "volunteer02@protectanimal.org.hk",
        password: await hashPassword("12345678"),
        mobile: "28002800",
        address: "香港灣仔中心 (總部)",
        district_org: "hong_kong_island",
      },
      {
        logo: "organisation4.png",
        name: "保護遺棄貓狗協會",
        email: "pcd03@pcd.org.hk",
        password: await hashPassword("12345678"),
        mobile: "28382838",
        address: "新界元朗僑興路白沙村第一段",
        district_org:"new_territories",
      },

      {
        logo: "organisation3.png",
        name: "香港關愛庇護動物之家",
        email: "volunteer.lovepet04@gmail.com",
        password: await hashPassword("12345678"),
        mobile: "28426812",
        address: "新界屯門屏山鄉后海灣濱",
        district_org:"new_territories",
      },
      {
        logo: "organisation5.png",
        name: "貓貓狗狗保護園",
        email: "HongKongAnimalLover@gmail.com",
        password: await hashPassword("12345678"),
        mobile: "28424234",
        address: "屯門青山公路藍地段",
        district_org:"new_territories",
      },
      {
        logo: "organisation6.png",
        name: "動物救援之家",
        email: "AnimalShelter@gmail.com",
        password: await hashPassword("12345678"),
        mobile: "67125234",
        address: "荃灣荃運工業大廈2期",
        district_org: "kowloon",
      },
      {
        logo: "organisation7.png",
        name: "流浪動物之家",
        email: "PetShelter@gmail.com",
        password: await hashPassword("12345678"),
        mobile: "35375234",
        address: "灣仔晏頓街1號安定大廈1樓",
        district_org: "hong_kong_island",
      },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}
