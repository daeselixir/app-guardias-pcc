const express = require("express");
const router = express.Router();
const { getAllUsers, getById } = require("../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/:id").get(getById);

module.exports = router;
