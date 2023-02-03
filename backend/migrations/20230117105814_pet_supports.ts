import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.PET_SUPPORTS;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.text("conversation");
    table.string("image");
    table.enum("role", ["user", "organisation"]);
    table.enum("status", ["completed", "pending", "cancelled"]).defaultTo("pending");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.integer("organisation_id").unsigned();
    table.foreign("organisation_id").references("organisations.id").onDelete("CASCADE");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
