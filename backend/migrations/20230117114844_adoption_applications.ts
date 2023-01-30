import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.ADOPTION_APPLICATIONS;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("name");
    table.string("email");
    table.integer("mobile");
    table.text("remark");
    table.enum("status", ["pending", "success", "fail"]).notNullable().defaultTo("pending");
    table.enum("fail_reason", ["not_applicable", "age_under_21", "no_window_screen", "other"]);

    table.text("other_fail_reason");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.integer("pet_id").unsigned();
    table.foreign("pet_id").references("pets.id").onDelete("CASCADE");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
