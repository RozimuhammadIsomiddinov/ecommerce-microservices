module.exports = {
  readAll: `
    SELECT *FROM products LIMIT ? OFFSET ?;
    `,
  readByID: `
    SELECT *FROM products FROM id = ?;
    `,
  readByName: `
    SELECT *FROM products FROM name iLike ?;
    `,
};
