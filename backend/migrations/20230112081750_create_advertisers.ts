import type { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.ADVERTISERS;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("media_path").notNullable();
    table.string("link");
    table.integer("total_clicked_ads_times_per_year");
    table.integer("total_watched_ads_times_per_year");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
