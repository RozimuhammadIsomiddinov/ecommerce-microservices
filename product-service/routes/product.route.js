const express = require("express");
const {
  readAllCont,
  readByIDCont,
  readByNameCont,
} = require("../controller/read/read");

const router = express.Router();

router.get("/all", readAllCont);
router.get("/name", readByNameCont);
router.get("/:id", readByIDCont);
module.exports = router;
