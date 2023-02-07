import { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

const tableName = TABLES.ORGANISATIONS;


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName,(table)=>{
        table.enum("district_org", ["hong_kong_island", "new_territories", "kowloon"]).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
await knex.schema.alterTable(tableName,(table)=>{
    table.dropColumn('district_org');
})
}

