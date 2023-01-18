import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName= TABLES.BADGE_USER_JUNCTION

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table
      .enum("rank", ["gold", "silver", "copper"])
      .notNullable();
    table.string("year").notNullable();
    table.integer("badge_id").unsigned();
    table.foreign("badge_id").references("badges.id").onDelete('CASCADE');
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id").onDelete('CASCADE');
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}

