import type { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.ADVERTISERS;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("media").notNullable();
    table.string("link");

    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
