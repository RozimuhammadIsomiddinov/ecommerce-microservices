const db = require("../../config/dbConfig");

const { readAll, readByID, readByName } = require("./model");

const readAllCont = async (req, res) => {
  const { page } = req.query;
  const pageSize = 20;
  const offset = (page ? page : 1 - 1) * pageSize;
  try {
    const totalCountResult = await db.raw(`SELECT COUNT(*) FROM products`);
    const totalRecords = parseInt(totalCountResult.rows[0].count);

    const dataResult = await db.raw(readAll, [pageSize, offset]);

    const data = dataResult.rows;

    const totalPages = Math.ceil(totalRecords / pageSize);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    res.status(200).json({
      data,
      pagination: {
        total_records: totalRecords,
        current_page: page,
        total_pages: totalPages,
        next_page: nextPage,
        prev_page: prevPage,
      },
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from readAllCont", error: e.message });
  }
};

const readByIDCont = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.raw(readByID, [id]);
    return res.status(200).json(rows[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from readByIDCont", error: e.message });
  }
};

const readByNameCont = async (req, res) => {
  const { name } = req.query;
  if (!name)
    return res.status(400).json({ message: "please fill a name field" });
  try {
    const { rows } = await db.raw(readByName, [name]);
    return res.status(200).json(rows);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from readByNameCont", error: e.message });
  }
};
module.exports = { readAllCont, readByIDCont, readByNameCont };
