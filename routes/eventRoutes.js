const express = require("express");
const router = express.Router();
const {
  getByID,
  getAllEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.route("/").get(getAllEvent).post(createEvent);
router.route("/:id").get(getByID).patch(updateEvent).delete(deleteEvent);

module.exports = router;
