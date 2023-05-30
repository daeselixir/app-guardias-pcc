const express = require("express");
const router = express.Router();
const {
  getAllIncident,
  getByID,
  createIncident,
  updateIncident,
  deleteIncident,
} = require("../controllers/incidentController");

router.route("/").get(getByID).post(createIncident);
router
  .route("/:id")
  .get(getAllIncident)
  .patch(updateIncident)
  .delete(deleteIncident);

module.exports = router;
