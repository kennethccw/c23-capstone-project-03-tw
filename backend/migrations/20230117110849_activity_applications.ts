import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.ACTIVITY_APPLICATIONS;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.boolean("is_approved").defaultTo(false);
    table.boolean("is_participated").defaultTo(false);
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.integer("activity_id").unsigned();
    table.foreign("activity_id").references("activities.id").onDelete("CASCADE");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
