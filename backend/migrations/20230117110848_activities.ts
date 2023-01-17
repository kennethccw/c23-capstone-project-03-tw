import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.ACTIVITIES;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments()
    table.string("name");
    table.enum("type", ["editors_choice", "urgent", "popular", "others"]).notNullable();
    table.string("image");
    table.text("description");
    table.date("date");
    table.timestamp("start_time");
    table.timestamp("end_time");
    table.text("requirement");
    table.enum("district", ["hong_kong_island", "new_territories", "kowloon"]).notNullable();
    table.string("location");
    table.integer("place");
    table.decimal("fee");
    table.integer("organisation_id").unsigned();
    table.foreign("organisation_id").references("organisations.id").onDelete("CASCADE");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
