import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("adoption_applications").insert([
      {
        name: "lovepetuser01",
        email: "lovepetuser01@gmail.com",
        mobile: 12345678,
        remark: "",
        is_approved: true,
        status: "success",
        fail_reason: "not_applicable",
        other_fail_reason: "",
        user_id: 1,
        pet_id: 1,
      },
      {
        name: "lovepetuser02",
        email: "lovepetuser02@gmail.com",
        mobile: 12345678,
        remark: "",
        is_approved: false,
        status: "fail",
        fail_reason: "other",
        other_fail_reason: "申請者曾虐待動物，被判社會服務令",
        user_id: 2,
        pet_id: 2,
      },
      {
        name: "lovepetuser01",
        email: "lovepetuser01@gmail.com",
        mobile: 12345678,
        remark: "",
        is_approved: true,
        status: "fail",
        fail_reason: "other",
        other_fail_reason: "已成功在此平台領養了另一隻流浪貓",
        user_id: 1,
        pet_id: 4,
      },
    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}