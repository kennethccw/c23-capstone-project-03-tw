import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName =TABLES.USER_TOTAL_ACTIVITIES_PARTICIPATED_TIMES

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.integer("total_activities_participated_times");
    table.integer("year");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}