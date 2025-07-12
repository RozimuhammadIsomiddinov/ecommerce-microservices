// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();

const {
  PRODUCT_DB_PASSWORD,
  PRODUCT_DB_NAME,
  PRODUCT_DB_HOST,
  PRODUCT_DB_USERNAME,
} = process.env;

module.exports = {
  client: "pg",
  connection: {
    host: PRODUCT_DB_HOST,
    user: PRODUCT_DB_USERNAME,
    password: PRODUCT_DB_PASSWORD,
    database: PRODUCT_DB_NAME,
  },
  migrations: {
    directory: "./migrations",
  },
};
