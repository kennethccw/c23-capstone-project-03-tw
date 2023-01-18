import type { Knex } from "knex";
import { TABLES } from "../src/utils/tables";

export async function seed(knex: Knex): Promise<void> {
  console.log("drop")
  // Deletes ALL existing entries
  const tables = [
    TABLES.ADMINS,
    TABLES.ADVERTISERS,
    TABLES.USERS,
    TABLES.ORGANISATIONS,
    TABLES.BADGES,
    TABLES.BADGE_USER_JUNCTION,
    TABLES.IT_SUPPORTS,
    TABLES.PET_SUPPORTS,
    TABLES.ACTIVITIES,
    TABLES.ACTIVITY_APPLICATIONS,
    TABLES.ONETIME_PAYMENT_DONATIONS,
    TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES,
    TABLES.USER_TOTAL_ACTIVITIES_PARTICIPATED_TIMES,
    TABLES.PETS,
    TABLES.ADOPTION_APPLICATIONS,
    TABLES.USER_TOTAL_DONATIONS,
  ];
  const trx = await knex.transaction();

  try {

    for (const table of tables) {
      
      await trx(table).del();
    }

    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}