import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.PETS;


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName,(table)=>{
        table.boolean('is_deleted').defaultTo(false);
    })
}


export async function down(knex: Knex): Promise<void> {
await knex.schema.alterTable(tableName,(table)=>{
    table.dropColumn('is_deleted');
})
}
