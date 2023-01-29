import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.ONETIME_PAYMENT_DONATIONS;

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("receipt_name");
    table.string("receipt_email");
    table.string("receipt_mobile").checkRegex("[0-9]{8}");
    table.enum("payment_method", ["credit_card"]).notNullable();
    table.decimal("donation_amount");
    table.boolean("accept_recieve_edm").defaultTo(false);
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
