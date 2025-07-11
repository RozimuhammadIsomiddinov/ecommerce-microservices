/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(
    `
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        oauth_provider VARCHAR(50) DEFAULT 'local',
        oauth_id VARCHAR(100),
        avatar_url VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        full_name VARCHAR(100),
        password VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW());`
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw(
    `
    DROP TABLE IF EXISTS users;`
  );
};
