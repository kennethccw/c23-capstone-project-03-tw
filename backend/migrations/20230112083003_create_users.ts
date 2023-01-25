import type { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.USERS;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("photo");
    table.string("fullname");
    table
      .string("username")
      .unique()
      .notNullable()
      .checkLength("<=", 16) /* .checkLength(">=", 6) */;
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("mobile").checkRegex("[0-9]{8}");
    table.date("birthday");
    table.enum("gender", ["male", "female", "others"]);
    table.boolean("is_experienced");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
