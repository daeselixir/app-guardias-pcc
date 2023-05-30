const express = require("express");
const router = express.Router();
const { requireToken } = require("../controllers/authController");

const {
  getByID,
  getAllArea,
  createArea,
  updateArea,
  deleteArea,
} = require("../controllers/areaController");

router.route("/").get(getAllArea).post(requireToken,createArea);
router.route("/:id").get(requireToken,getByID).patch(requireToken,updateArea).delete(requireToken,deleteArea);


module.exports = router;