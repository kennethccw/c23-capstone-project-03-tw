import type { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.ORGANISATIONS;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("logo").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("mobile").notNullable().checkRegex("[0-9]{8}");
    table.string("address").notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
