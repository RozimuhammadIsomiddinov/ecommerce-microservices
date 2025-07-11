require("dotenv").config();

const { AUTH_DB_PASSWORD, AUTH_DB_NAME, AUTH_DB_HOST, AUTH_DB_USERNAME } =
  process.env;

module.exports = {
  client: "pg",
  connection: {
    host: AUTH_DB_HOST,
    user: AUTH_DB_USERNAME,
    password: AUTH_DB_PASSWORD,
    database: AUTH_DB_NAME,
  },
  migrations: {
    directory: "./migrations",
  },
};
