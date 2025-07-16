module.exports = {
  readAll: `
    SELECT * FROM products
    LIMIT ? OFFSET ?;
  `,
  readByID: `
    SELECT * FROM products
    WHERE id = ?;
  `,
  readByName: `
    SELECT * FROM products
    WHERE name ILIKE ?;
  `,
};
