const router = require("express").Router();
const {
  storeStudentsInRDS,
  getStudentsFromRDS,
} = require("../controllers/students");

router.get("/storestudents", storeStudentsInRDS);
router.get("/liststudents", getStudentsFromRDS);

module.exports = router;
