import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.NOTIFICATION;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.enum("type", ["badge", "message", "activity", "adoption"]);
    table.string("content");
    table.integer("count");
    table.integer("any_id").unsigned();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
