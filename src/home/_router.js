const router = require("express").Router();
require("dotenv").config();

// Template route to check if the back-end properly is connected
router.get("/", (_, res) => {
  res.json("Hello world from template sensual!! 7u7");
});

module.exports = router;
