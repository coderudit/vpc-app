const router = require("express").Router();
const {
  storeStudentsInRDS,
  getStudentsFromRDS,
} = require("../controllers/students");

router.post("/storestudents", storeStudentsInRDS);
router.get("/liststudents", getStudentsFromRDS);

module.exports = router;
