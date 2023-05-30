const express = require("express");
const router = express.Router();
const {
  getByID,
  getAllShift,
  createShift,
  updateShift,
  deleteShift,
} = require("../controllers/shiftController");

router.route("/").get(getAllShift).post(createShift);
router.route("/:id").get(getByID).patch(updateShift).delete(deleteShift);

module.exports = router;
