import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName= TABLES.IT_SUPPORTS

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.text("conversation");
    table.enum("status", ["completed", "pending", "cancelled"])
    .notNullable();
    table.integer("admin_id").unsigned();
    table.foreign("admin_id").references("admins.id").onDelete('CASCADE');
    table.integer("organisation_id").unsigned();
    table.foreign("organisation_id").references("organisations.id").onDelete('CASCADE');
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
