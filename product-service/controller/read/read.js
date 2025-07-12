const db = require("../../config/dbConfig");

const { readAll } = require("./model");

const readAllCont = async (req, res) => {
  const { page } = req.query;
  const pageSize = 20;
  const offset = (page - 1) * pageSize;
  try {
    const totalCountResult = await db.raw(`SELECT COUNT(*) FROM products`);
    const totalRecords = parseInt(totalCountResult.rows[0].count);
    const dataResult = await db.raw(readAll, [pageSize, offset]);

    const data = dataResult.rows;

    const totalPages = Math.ceil(totalRecords / pageSize);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      data,
      pagination: {
        total_records: totalRecords,
        current_page: page,
        total_pages: totalPages,
        next_page: nextPage,
        prev_page: prevPage,
      },
    };
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from readAllCont", error: e.message });
  }
};
