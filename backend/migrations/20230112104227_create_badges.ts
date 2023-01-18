import type { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.BADGES;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table
      .enum("type", ["warmhearted", "advertising_philanthropist", "donation_philanthropist"])
      .notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
