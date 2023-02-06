import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();
// Update with your config settings.
console.log("check env", process.env.DB_NAME);

console.log(`
database: ${process.env.DB_NAME},
user: ${process.env.DB_USER},
password: ${process.env.DB_PASS},
host: ${process.env.POSTGRES_HOST},`);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      // host: process.env.POSTGRES_HOST,
    },
    pool: {
      min: 2,
      max: 10,
      propagateCreateError: false,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.POSTGRES_HOST,
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
      propagateCreateError: false,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
    },
    pool: {
      min: 2,
      max: 10,
      propagateCreateError: false,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

console.log("check knexfile config", config);

module.exports = config;
export default config;
