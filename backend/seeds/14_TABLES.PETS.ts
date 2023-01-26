import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("pets").insert([
      {
        image: "frontend/public/photos/pet/pet-boss.png",
        name: "Boss",
        age: "2-3 months",
        weight: 1.8,
        gender: "male",
        breed: "英短",
        remark: "1針  / 非常乖 / 任摸任抱 / 識砂盆便便 / 但時會屙係地。",
        organisation_id: 1,
      },
      {
        image: "frontend/public/photos/pet/pet-moggie.png",
        name: "Moggie",
        age: "2-4 year old",
        weight: 3,
        gender: "male",
        breed: "英國短毛",
        remark: "曾患Fip / 已經康復及有心臟問題。",
        organisation_id: 1,
      },
      {
        image: "frontend/public/photos/pet/pet-momo.png",
        name: "Momo",
        age: "2-4 year old",
        weight: 5,
        gender: "male",
        breed: "唐狗",
        remark: "齊針 / 已絕育 / 非常乖。",
        organisation_id: 1,
      },
      {
        image: "frontend/public/photos/pet/pet-sleepy.png",
        name: "Sleepy",
        age: "3 months",
        weight: 10,
        gender: "female",
        breed: "唐狗",
        remark: "未絕育 / 已打一針 / 已杜蟲杜蝨。",
        organisation_id: 2,
      },
      {
        image: "frontend/public/photos/pet/pet-kelly.png",
        name: "Kelly",
        age: "13 year old",
        weight: 4.5,
        gender: "female",
        breed: "土耳其安哥拉貓)",
        remark: "已絕育 / 年長貓 / 健康。",
        organisation_id: 2,
      },
      {
        image: "frontend/public/photos/pet/pet-meme.png",
        name: "MeMe",
        age: "14 year old",
        weight: 4.5,
        gender: "female",
        breed: "英國短毛貓 & 蘇格蘭摺耳貓",
        remark: "已絕育 / 年長貓 / 健康。",
        organisation_id: 2,
      },
      {
        image: "frontend/public/photos/pet/pet-為食仔.png",
        name: "為食仔",
        age: "8-9 year old",
        weight: 5,
        gender: "male",
        breed: "蘇格蘭摺耳貓",
        remark: "為食仔係摺耳貓，養前要了解佢有基因缺陷既問題，同埋需要特別留意同護理既事項！佢依家需要食腎糧同腎臟既supplements，要定期清潔耳仔。",
        organisation_id: 3,
      },
      {
        image: "frontend/public/photos/pet/pet-himhim.png",
        name: "Him Him",
        age: "1-2 year old",
        weight: 5,
        gender: "female",
        breed: "唐貓",
        remark: "已絕育 / 溫馴 / 可摸 / 為食。",
        organisation_id: 3,
      },
      {
        image: "frontend/public/photos/pet/pet-coco.png",
        name: "Co Co",
        age: "2 months",
        weight: 2,
        gender: "female",
        breed: "唐貓",
        remark: "溫馴 / 可摸 / 為食。",
        organisation_id: 4,
      },
      {
        image: "frontend/public/photos/pet/pet-blue.png",
        name: "Blue",
        age: "1 year old",
        weight: 4,
        gender: "male",
        breed: "唐貓",
        remark: "溫馴 / 乖巧 / 喜歡觀察 / 穩定。",
        organisation_id: 4,
      },

    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}