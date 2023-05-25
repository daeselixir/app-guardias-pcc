const express = require("express");
const router = express.Router();
const { requireToken } = require("../controllers/authController");

const {
  getAllUsers,
  getById,
  deleteById,
  updateById,
} = require("../controllers/userController");

router.route("/").get(requireToken, getAllUsers);
router
  .route("/:id")
  .get(requireToken, getById)
  .delete(requireToken, deleteById)
  .patch(requireToken, updateById);

module.exports = router;
