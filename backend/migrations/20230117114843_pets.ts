import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.PETS

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("image");
    table.string("name");
    table.string("age");
    table.decimal("weight");
    table.enum("gender", ["female", "male"]).notNullable();
    table.string("breed");
    table.string("remark");
    table.integer("organisation_id").unsigned();
    table.foreign("organisation_id").references("organisations.id").onDelete("CASCADE");
    table.timestamps(false, true);
});
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}

