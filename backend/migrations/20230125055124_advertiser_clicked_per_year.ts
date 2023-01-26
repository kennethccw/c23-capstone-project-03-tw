import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.ADVERTISER_CLICKED_PER_YEAR;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.integer("total_click_times");
    table.integer("year");
    table.integer("advertiser_id").unsigned();
    table.foreign("advertiser_id").references("advertisers.id").onDelete("CASCADE");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
